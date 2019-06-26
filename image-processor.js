const Jimp = require('jimp');

class ImageProcessor {

    crop(imageBuffer, box) {
        return new Promise((resolve, reject) => { 
	   Jimp.read(imageBuffer).then((image) => {
		image.crop(box.x, box.y, box.w, box.h);
		image.getBase64('image/jpeg', (data) => {
		   resolve(data);  
		});
	   }).catch((err) => {
		reject(err);
	   });
	});	
    }
}

module.exports = ImageProcessor;
