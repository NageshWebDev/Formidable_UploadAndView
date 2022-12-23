const express = require('express');
const formidable = require('formidable');
const path = require('path')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/api/upload', (req, res) => {

    const form = formidable({
        multiples: false,
        encoding: 'utf-8',
        allowEmptyFiles: false,
        uploadDir: path.join(__dirname, "../my-app/src/uploads"),
        filename: (name, ext, part, form) => {
            return part.originalFilename;
        }
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ message: `${err}` })
        }
        console.log("sending file path")
        console.log(files)
        res.status(200).json(`uploads/${files.myFile.newFilename}`);
    });

});

app.post('/api/uploadMultiple', (req, res) => {

    const form = formidable({
        multiples: true,
        encoding: 'utf-8',
        allowEmptyFiles: false,
        uploadDir: path.join(__dirname, "../my-app/src/uploads/Multiple"),
        filename: (name, ext, part, form) => {
            return part.originalFilename;
        }
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ message: `${err}` })
        }
        console.log("sending file path")
        const filesM = files.myFiles.map(item =>{
            return `uploads/${item.newFilename}`
        })
        console.log(filesM)
        
        res.status(200).json(filesM);
    });

});

app.listen(8000, () => {
    console.log('Server listening on http://localhost:8000 ...');
});