import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(path.resolve(), "uploadImages"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() *100);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const uploadImages = multer({storage});

export default uploadImages;