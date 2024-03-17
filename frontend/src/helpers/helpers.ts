export const getErrorMessage = (response: any) => {
  if (response?.data?.message instanceof Array) {
    return response?.data?.message[0];
  }
  return response?.data?.message;
};
