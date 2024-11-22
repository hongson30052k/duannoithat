const GenerateIdWithDate: any = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomString = Math.random().toString(36).substr(2, 5).toUpperCase();

  return `${year}${month}${day}${randomString}`;
};

export default GenerateIdWithDate;
