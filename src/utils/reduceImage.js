const reduceImage = img64 => {
  let y = 1;
  if (img64.endsWith('==')) y = 2;
  const x_size = img64.length * (3 / 4) - y;
  const size = Math.round(x_size / 1024);

  if (size <= 950) return img64;

  var img = new Image();
  img.src = img64;

  return new Promise((resolve, reject) => {
    img.onload = function () {
      var canvas = document.createElement('canvas');

      const MAX_WIDTH = 700;
      const scaleBy = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleBy;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const srcEnc = ctx.canvas.toDataURL(img, 1);

      resolve(srcEnc);
    };

    img.onerror = e => reject(e);
  });
};

export default reduceImage;
