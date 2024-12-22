export const getHeaders = () => {
  const token = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
