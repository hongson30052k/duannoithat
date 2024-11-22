import { axiosInstance } from "../axiosClient";

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
