const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('here')
    cb(null, './public')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(mimetype && extname){
      console.log('in upload if')
      return cb(null, true)
    }else{
      console.log('in upload else')
      return cb(null, false)
    }
  }
})

module.exports = {
  upload
}

// const multer = require("multer");
// const path = require("path");


// const FILE_TYPE_MAP={
//     'image/png':'png',
//     'image/jpeg':'jpeg',
//     'image/jpg':'jpg',
//     'image/webp':'webp'
// }

// //image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const isValid = FILE_TYPE_MAP[file.mimetype]
//         let uploadError = new Error('Invalid image type') 
//         if(!isValid){
//             console.log('image upload failed!!')
//         }
//         else if(isValid){
//             uploadError=null
//         }
//         cb(uploadError,('public'));
//     },
//     filename: function (req, file, cb) {
//         const fileName=file.originalname.split('  ').join('_')
//         console.log('erer');
//         console.log(fileName);
//         const extension = FILE_TYPE_MAP[file.mimetype]
//         console.log(extension);
//         cb(null, `${fileName}`)
//     },
    
// });  
// const upload = multer({ storage: storage })

// module.exports={upload}