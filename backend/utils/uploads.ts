import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

const createStorage = (uploadDir: string) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });
};

const fileFilter = (req: any, file:  Express.Multer.File, cb : Function) : void => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const createAvatarUploader = (uploadDir: string) => {
  return multer({
    storage: createStorage(uploadDir),
    fileFilter,
  });
};

export const uploadAvatar = createAvatarUploader('uploads/avatar');
export const uploadGrpAvatar = createAvatarUploader('uploads/grp_avatar');
