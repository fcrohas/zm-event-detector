const Jimp = require('jimp');

class ImageProcessor {

  crop(imageBuffer, box) {
	return new Promise((resolve, reject) => { 
	   Jimp.read(imageBuffer).then((image) => {
		image.crop(box.x, box.y, box.w, box.h)
		     .getBase64(Jimp.AUTO, (err, data) => {
		   resolve(data);  
		});
	   }).catch((err) => {
		reject(err);
	   });
	});	
  }
}

module.exports = ImageProcessor;
