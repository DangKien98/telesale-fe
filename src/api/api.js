import axios from "axios";

const API_DOMAIN = process.env.BASE_URL || process.env.BASE_URL || "http://localhost:3000";

export async function getAllCustomer() {
  const response = await axios.get(`${API_DOMAIN}/customer`);
  const data = await response.json();

  return data;
}
