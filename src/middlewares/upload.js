import multer from 'multer';
import sharp from 'sharp';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

const createThumbnail = async (req, res, next) => {
  // Jos pyynnössä ei ole tiedostoa, hypätään suoraan eteenpäin
  if (!req.file) {
    next();
    return;
  }

  console.log('Käsitellään tiedostoa:', req.file.path);
  
  // Määritetään pikkukuvan polku (esim. uploads/abc123_thumb)
  const thumbPath = req.file.path + '_thumb';

  try {
    // Tehdään 160x160 kokoinen pikkukuva
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(thumbPath);
    
    console.log('Thumbnail luotu polkuun:', thumbPath);
    next(); // Kaikki ok, siirrytään controlleriin
  } catch (error) {
    console.error('Sharp-virhe:', error);
    next(error);
  }
};

export { upload, createThumbnail };