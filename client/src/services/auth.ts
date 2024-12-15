import axios from "axios";

interface signupProps {
  firstName: string;
  lastName: string;
}

export async function Signup(data: signupProps) {
  try {
    let url = `localhost:3000/api/v1/auth/signup`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
