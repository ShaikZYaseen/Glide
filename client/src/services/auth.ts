import axios from "axios";

interface signupProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image?: File; // Image will now be a File object, not a string
  password: string;
}

const link = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function Signup(data: signupProps) {
  console.log(data, "data");

  try {
    let url = `${link}/api/v1/auth/signup`;

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface loginProps {
  email: string;
  password: string;
}

export async function Login(data: loginProps) {
  try {
    let url = `${link}/api/v1/auth/login`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
