const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name:'dnzwgbqb3',
    api_key:'196657388649913',
    api_secret:'J1pNcdJBWF33upgGv-cf-s5Ie1I'
})

const storage = new multer.memoryStorage();

async function ImageUpload(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result
}

const upload = multer({storage})

module.exports = {upload,ImageUpload};