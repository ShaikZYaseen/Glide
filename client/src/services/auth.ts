import axios from "axios";
import { getHeaders } from "../utils/GetHeaders";

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

export async function captainLogin(data: loginProps) {
  try {
    let url = `${link}/api/v1/captain/login`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function captainSignup(data: signupProps) {
  try {
    let url = `${link}/api/v1/captain/signup`;

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

export async function captainLogout() {
  try {
    let url = `${link}/api/v1/captain/logout`;

    const response = await axios.post(
      url,
      {},
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function userLogout() {
  try {
    let url = `${link}/api/v1/auth/logout`;

    const response = await axios.post(
      url,
      {},
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLoggedUser() {
  try {
    let url = `${link}/api/v1/auth/profile`;
    const response = await axios.get(url, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
