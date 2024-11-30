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
    const regex = new RegExp('\\{(.*?)\\}', 'g');  // 중괄호로 묶인 부분을 찾는 정규 표현식
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
          const lastLine =  result.match(regex);  // 마지막 줄만 추출
          console.log('Last result:', lastLine);  // 마지막 줄 확인
          
          // 마지막 줄이 JSON이라면 파싱
          const jsonResult = JSON.parse(lastLine);  // JSON으로 변환
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
          console.log("result 결과 :" , result)
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

      const jsonResponse = {
        average_score : pythonResult.decibel_count,
        decibel_count : pythonResult.decibel_comment,
        text : pythonResult2.text,
        strength : pythonResult2.grammar_correction.strengths,
        weakness : pythonResult2.grammar_correction.weaknesses,
        feedback : pythonResult2.grammar_correction.content_feedback,
        total_score : pythonResult2.grammar_correction.total_score


      }
      
      console.log("json response" , jsonResponse)

res.status(200).json(jsonResponse);
} catch (error) {
      console.error(error);
      res.status(500).json({ message : 'fail' });
    }
  } else {
    res.status(405).json({ error: 'Only POST requests are allowed.' });
  }
};
