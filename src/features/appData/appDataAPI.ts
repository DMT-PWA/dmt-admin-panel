export const handleFileUpload = async (uploadFile: File) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  // formData.append('public_id', name); // created new upload with unique file name // the public_id is the name of the file
  // formData.append("upload_preset", "dancehub"); // created new uplaod
  formData.append("upload_preset", "dmt_apps");
  const url = "https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/";

  try {
    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    const updatedResponse = await response.json();

    return updatedResponse.secure_url;
  } catch (error) {
    console.log(error);
  }
};
