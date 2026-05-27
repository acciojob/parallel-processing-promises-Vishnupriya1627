const button = document.querySelector("#download-images-button");

const loading = document.querySelector("#loading");

const errorDiv = document.querySelector("#error");

const output = document.querySelector("#output");

const imageUrls = [
  "https://picsum.photos/300?random=1",
  "https://picsum.photos/300?random=2",
  "https://picsum.photos/300?random=3",
];

const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = url;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };
  });
};

const downloadImages = async () => {
  output.innerHTML = "";

  errorDiv.innerHTML = "";

  loading.innerHTML = `<div class="spinner"></div>`;

  try {
    const images = await Promise.all(
      imageUrls.map((url) => downloadImage(url)),
    );

    loading.innerHTML = "";

    images.forEach((img) => {
      output.appendChild(img);
    });
  } catch (error) {
    loading.innerHTML = "";

    errorDiv.innerHTML = error;
  }
};

button.addEventListener("click", downloadImages);
