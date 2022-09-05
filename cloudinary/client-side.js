const api_key = '722451949134499';
const cloud_name = 'art-garage';

document.querySelector('.upload-image').addEventListener('submit', async function (event) {
  event.preventDefault();

  const data = new FormData();
  data.append('file', documemt.querySelector('.artist-update-form').files[0])
  data.append('api_key', api_key)
  data.append('signature', signatureResponse.data.signature)
  data.append('timestamp', signatureResponse.data.timestamp)

  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (event) {
      console.log(event.loaded / event.total)
    }
  })
  console.log(cloudinaryResponse.data)

  // send the image info back to our server
  const photoData = {
    public_id: cloudinaryResponse.data.public_id,
    version: cloudinaryResponse.data.version,
    signature: cloudinaryResponse.data.signature
  }

  axios.post("/do-something-with-photo", photoData)
})
