const multer = require("multer");

const storage = multer.diskStorage({                //diskstorage is used to save FILES in our SYSTEM
    destination: function (req, file, cb) {        //destination mtlb kaha store krna h
        cb(null, 'Upload/')                       //ye upload FOLDER ka name h jaha pics jaayenge
    },
    filename: function (req, file, cb) {        
        cb(null, Date.now() + "-" + file.originalname);  //Date.now() always USE IT to make file name UNIQUE
    } 
}); 

const upload = multer({storage: storage}); 
module.exports = upload;