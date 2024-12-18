import axios from "axios";

interface signupProps {
  firstName: string;
  lastName: string;
}
const link = import.meta.env.BACKEND_URL;

export async function Signup(data: signupProps) {
  try {
    let url = `${link}/api/v1/auth/signup`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
