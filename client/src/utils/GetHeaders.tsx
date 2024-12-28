export const getheaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
  };
};
