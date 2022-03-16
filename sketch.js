const encoding = "Ñ@#W$9876543210?!abc;:+=-,._                        ";

let videoStream;
let asciiStream;

function setup() {
  noCanvas();
  videoStream = createCapture(VIDEO);
  videoStream.size(256, 128);
  asciiStream = createDiv();
}

function draw() {
  videoStream.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < videoStream.height; j++) {
    for (let i = 0; i < videoStream.width; i++) {
      const pixelIndex = (i + j * videoStream.width) * 4;
      const r = videoStream.pixels[pixelIndex + 0];
      const g = videoStream.pixels[pixelIndex + 1];
      const b = videoStream.pixels[pixelIndex + 2];

      const brightness = (r + g + b) / 3;
      const length = encoding.length;
      const charIndex = floor(map(brightness, 0, 255, 0, length));
      const c = encoding.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += "<br/>";
  }
  asciiStream.html(asciiImage);
}
