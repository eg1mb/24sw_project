// pages/api/upload.js
import fs from 'fs';
import multer from 'multer';
import { exec } from 'child_process';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { spawn } from 'child_process';


const uploadPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const upload = multer({ dest: uploadPath });

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
};
// 목소리 속도 
const runPythonScript = async (file) => {
  const z = Math.floor(Math.random() * 1000) + 1
  const pythonPath = 'python';
  const pythonfilePath = path.join(process.cwd(), 'pythonfiles', 'Python_speed.py');
  const inputPath = path.join(process.cwd(), 'wav');
  const outputPath2 = path.join(inputPath, `output_${z}.wav`);
  

  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    //const regex = new RegExp('\\{(.*?)\\}', 'g');  // 중괄호로 묶인 부분을 찾는 정규 표현식
    const childPython = spawn(pythonPath, [pythonfilePath, file, outputPath2], {
      encoding: 'utf-8'  // 인코딩을 UTF-8로 설정
    });
    let result = '';

    childPython.stdout.on('data', (data) => {
      result += data.toString(); 
    });

    childPython.stderr.on('data', (data) => {
      console.error(`stderr : ${data.toString()}`);
    });

    childPython.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed with code ${code}`));
      } else {
        try {
          // 마지막 줄만 추출
           // 마지막 줄만 추출
          console.log('Last result:', result);  // 마지막 줄 확인
          const result2 = result.trim()
          // 마지막 줄이 JSON이라면 파싱
          const jsonResult = JSON.parse(result2);  // JSON으로 변환
          resolve(jsonResult);  // JSON 객체 반환
        } catch (error) {
          console.error('Error parsing result:', error.message); // 에러 로그
          console.error('Python result:', result.trim()); // 원본 데이터 확인
          reject(new Error('Failed to parse Python result'));
        }
      }
    });
  });
};
// grammar correction & STT
const runPythonScript2 = async (file) => {
  const pythonPath = 'python';
  const pythonfilePath = path.join(process.cwd(), 'pythonfiles', 'STT_grammar.py');

  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    // 중괄호로 묶인 부분을 찾는 정규 표현식
    const regax = new RegExp('{.*')
    const childPython = spawn(pythonPath, [pythonfilePath, file], {
      encoding: 'utf-8'  // 인코딩을 UTF-8로 설정
    });
    let result = '';

    childPython.stdout.on('data', (data) => {
      result += data.toString(); 
    });

    childPython.stderr.on('data', (data) => {
      console.error(`stderr : ${data.toString()}`);
    });

    childPython.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed with code ${code}`));
      } else {
        try {
          // 마지막 줄만 추측 
          console.log("PythonScript2 실행 결과 :" , result)
          const result2 = result.trim()
          const jsonResult = JSON.parse(result2); 
          resolve(jsonResult);  // JSON 객체 반환
        } catch (error) {
          console.error('Error parsing result:', error.message); // 에러 로그
          console.error('Python result:', result.trim()); // 원본 데이터 확인
          reject(new Error('Failed to parse Python result'));
        }
      }
    });
  });
};







const convertAudio = async (filePath, outputFormat) => {
  return new Promise((resolve, reject) => {
    // date.now() 
    const z = Math.floor(Math.random() * 1000) + 1
    // mp3 이름 변환 날짜로 이름 정함 => 가져옴 
    const outputPath = path.join(uploadPath, `output_${z}.${outputFormat}`);
    const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
    exec(`"${ffmpegPath}" -i "${filePath}" "${outputPath}"`, (error, stdout, stderr) => {
      // python에서 return 받은 것 
      console.log(stdout);
      console.error(stderr);
      if (error) {
        reject(error);
      } else {
        resolve(outputPath);
      }
    });
  });
};

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, upload.single('speech'));

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const uploadedFilePath = path.join(uploadPath, req.file.filename);
      const convertedFilePath = await convertAudio(uploadedFilePath, 'mp3');
      const fileBuffer = await fsPromises.readFile(convertedFilePath);
      res.setHeader('Content-Disposition', 'attachment; filename=converted.mp3');
      res.setHeader('Content-Type', 'audio/mpeg');

      //await fsPromises.unlink(uploadedFilePath);
      //await fsPromises.unlink(convertedFilePath);
      // 파이썬 파일 보내기 
      const file = convertedFilePath 
      const pythonResult = await runPythonScript(file)
      const pythonResult2 = await runPythonScript2(file)

      console.log("pythonresult" , pythonResult)

    

      const jsonResponse = {
        total_score : (pythonResult.speed_score) +
                      (pythonResult.average_volume_score) +
                      (pythonResult2.grammar.grammar_contents_score) +
                      (pythonResult2.grammar.grammar_politeness_score) +
                      (pythonResult2.grammar.grammar_voca_score) +
                      (pythonResult2.grammar.grammar_sentcompletion_score), //  ,
        
        weak_strong : {
          weakness : [pythonResult2.grammar.weak1, pythonResult2.grammar.weak2, pythonResult2.grammar.weak3],
          strength : [pythonResult2.grammar.strength1, pythonResult2.grammar.strength2, pythonResult2.grammar.strength3],
        },
        
        speed_score: pythonResult.speed_score,
        
        volume_score: pythonResult.average_volume_score,
        
        grammar : {
          contents_score : pythonResult2.grammar.grammar_contents_score,
          politeness_score : pythonResult2.grammar.grammar_politeness_score,
          voca_score : pythonResult2.grammar.grammar_voca_score,
          sentcompletion_score : pythonResult2.grammar.grammar_sentcompletion_score,
          clarity_score : pythonResult2.grammar.detail_clarity_score 
        },
        details : {
          text : pythonResult2.text,
          Clarity : {hmm : [pythonResult2.grammar.detail_clarity_hmm] , reps : [pythonResult2.grammar.detail_clarity_repititions] ,
            blur : [pythonResult2.grammar.detail_clarity_blur]
          },
          Contents : [
            {origin : pythonResult2.grammar.detail_contents_origin1, correct : pythonResult2.grammar.detail_contents_correct1, reason : pythonResult2.grammar.detail_contents_reason1},
            {origin : pythonResult2.grammar.detail_contents_origin2, correct : pythonResult2.grammar.detail_contents_correct2, reason : pythonResult2.grammar.detail_contents_reason2}],
          Grammar : {
            politeness : [
              {original : pythonResult2.grammar.detail_politeness_origin1, corrected : pythonResult2.grammar.detail_politeness_correct1, reason : pythonResult2.grammar.detail_politeness_reason1},
              {original : pythonResult2.grammar.detail_politeness_origin2, corrected : pythonResult2.grammar.detail_politeness_correct2, reason : pythonResult2.grammar.detail_politeness_reason2}
          ],
          voca : [
              {original : pythonResult2.grammar.detail_voca_origin1, corrected : pythonResult2.grammar.detail_voca_correct1, reason : pythonResult2.grammar.detail_voca_reason1},
              {original : pythonResult2.grammar.detail_voca_origin2, corrected : pythonResult2.grammar.detail_voca_correct2, reason : pythonResult2.grammar.detail_voca_reason2}
          ],
          sent_completion : [
              {original : pythonResult2.grammar.detail_sentcompletion_origin1, corrected : pythonResult2.grammar.detail_sentcompletion_correct1, reason : pythonResult2.grammar.detail_sentcompletion_reason1},
              {original : pythonResult2.grammar.detail_sentcompletion_origin2, corrected : pythonResult2.grammar.detail_sentcompletion_correct2, reason : pythonResult2.grammar.detail_sentcompletion_reason2}
          ],

          }
         
        },
      }

      
      
      
      console.log("jsonResponse" , JSON.stringify(jsonResponse, null, 2))    

res.status(200).json(jsonResponse);
} catch (error) {
      console.error(error);
      res.status(500).json({ message : 'fail' });
    }
  } else {
    res.status(405).json({ error: 'Only POST requests are allowed.' });
  }
};
