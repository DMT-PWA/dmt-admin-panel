import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/*
 **************************************************************************************************************
 **************************************************************************************************************

                                          PWA Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

export const createPwa = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/pwa`, userData);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return message;
  }
};

export const getAllPwa = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/pwa`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return message;
  }
};

export const getPwaById = async (appId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/pwa/${appId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return message;
  }
};

export const getPwaByIdAndLanguage = async (
  appId: string,
  language: string,
  country: string
) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/pwa/${appId}/${language}/${country}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return message;
  }
};

export const updatePwa = async (userData) => {
  try {
    const response = await axios.patch(`${BACKEND_URL}/pwa`, userData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return message;
  }
};

export const updatePwaGeneral = async (userData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/pwa/update-general`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return message;
  }
};

export const updatePwaByCountryAndLanguage = async (userData: object) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/pwa/update-by-country-and-language`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return message;
  }
};

export const deletePwa = async (appId) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/pwa/${appId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return message;
  }
};

export const clonePwa = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/pwa/clonePwa`, userData);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return message;
  }
};

//============={file upload}========================================

export const handleFileUpload = async (uploadFile, name) => {
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

export const handleMultipleFileUpload = async (files) => {
  const formData = new FormData();

  let uploadedFiles = [];

  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
    // formData.append("file", files[i]?.uploadFile);
    // formData.append('public_id', files[i]?.name); // created new upload with unique file name // the public_id is the name of the file
    // formData.append("upload_preset", "dancehub");
    formData.append("upload_preset", "dmt_apps");
    const url = "https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/";

    try {
      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      const updatedResponse = await response.json();

      const uploadedFile = updatedResponse.secure_url;
      console.log({ uploadedFile: uploadedFiles });

      uploadedFiles.push(uploadedFile);

      console.log({ uploadedFiles2: uploadedFiles });
    } catch (error) {
      console.log(error);
    }
  }
  if (uploadedFiles.length > 0) {
    return uploadedFiles;
  }
};

export const createCollection = async (data) => {
  console.log(data);

  try {
    const response = await axios.post(`${BACKEND_URL}/collection`, data);

    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
