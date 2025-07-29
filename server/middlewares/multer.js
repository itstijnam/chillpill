import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const multiUpload = upload.fields([
  { name: 'filam_pics', maxCount: 1 },
  { name: 'filam_video', maxCount: 1 }
]);

export default multiUpload;
