import pdf from "pdf-parse";
import axios from "axios";

export const extractPdfText = async (url) => {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  const data = await pdf(res.data);
  return data.text;
};