const fs = require('fs')
const {v4:uuid} = require('uuid')

class Files{
    async uploadFile(req, res) {
        try {
          if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
          }
      
          const file = req.files.file;
          const uniqueName = uuid();
          const imgPath = uniqueName + '.jpg';
      
          file.mv('./public/images/' + imgPath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Failed to upload file.' });
            }
            
            return res.status(201).json({ data: imgPath, message: 'File uploaded.' });
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error, please try again.' });
        }
      }

      async  deleteImage(req, res) {
        try {
          const imageName = req.body.name;
          fs.unlink(`./public/images/${imageName}`, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Failed to delete image.' });
            }
            return res.status(200).json({ message: 'Image deleted.' });
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error, please try again.' });
        }
    }
    
};

module.exports = new Files();