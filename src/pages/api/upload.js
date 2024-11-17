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

const runPythonScript = async (file) => {
  // 자기 컴퓨터에서 파이썬 존재하는 주소 
  const pythonPath = 'C:\\Users\\khy12\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';
  // 자기 컴퓨터에서 파이썬 파일 존재하는 주소 
  const pythonfilePath = path.join(process.cwd(), 'pythonfiles' , 'Decibel_check.py')
  return new Promise((resolve, reject) => {
     const {spawn} = require('child_process');
      const childPython = spawn( pythonPath , [pythonfilePath , file  ])
      let result = ''

      childPython.stdout.on('data' , (data) => {
        console.log(`stdout : ${data}`)
        result += data.toString(); 
      })

      childPython.stderr.on('data' , (data) => {
        console.error(`stderr : ${data}`)
      })

      childPython.on('close' , (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed with code ${code}`));
        } else {
          resolve(result); // 최종 결과를 반환
        }
      })
    })
  
};


const convertAudio = async (filePath, outputFormat) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(uploadPath, `output_${Date.now()}.${outputFormat}`);
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
      res.end(fileBuffer);

      //await fsPromises.unlink(uploadedFilePath);
      //await fsPromises.unlink(convertedFilePath);
      // 파이썬 파일 보내기 
      const file = convertedFilePath 
      runPythonScript(file)

      

res.status(200).json({ message: 'success', data: "heg" });
} catch (error) {
      console.error(error);
      res.status(500).json({ message : 'fail' });
    }
  } else {
    res.status(405).json({ error: 'Only POST requests are allowed.' });
  }
};
