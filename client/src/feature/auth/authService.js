// servic ke under apn backend se jo apimka data aara hai usko handl krte hai
// axios api fetch krne ke use ata hai get post put delet update../

import axios from "axios";

// REGISTER
const register = async (formData) => {
  const response = await axios.post("https://karzone-z9pw.onrender.com/api/auth/register", formData, {
    withCredentials: true, // optional if using cookies
  });


  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// LOGIN
const login = async (formData) => {
  const response = await axios.post("https://karzone-z9pw.onrender.com/api/auth/login", formData, {
    withCredentials: true, // optional
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// EXPORT
const authService = { register, login };

export default authService;
