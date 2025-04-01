import {createReadStream} from "fs"
import {join} from "path"
import {existsSync} from "fs"

export default function handler(req, res) {
    const {path} = req.query;

    console.log('request path', req.url);
    console.log('path query', path);

    const filePath = join(process.cwd(), 'uploads', path.join('/'));
    console.log('filePath', filePath);

    if(!existsSync(filePath)) {
        console.log('File not found', filePath);
        return res.status(404).end('Not Found - file not found');
    }

    try {
        const fileStream = createReadStream(filePath);
        fileStream.on('open', () => {
            console.log('File opened', filePath);
        });
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error reading file', error);
        return res.status(500).end('Internal Server Error - error reading file');
    }
}