import axios, { AxiosResponse } from "axios";
import { FIGMA_API_URL } from "./constants";
import { FigmaDocument } from "../types";

export const getFigmaFile = async (token: string, fileKey: string) => {
  try {
    const res: AxiosResponse<FigmaDocument> = await axios.get(`${FIGMA_API_URL}${fileKey}`, {
      headers: { "X-Figma-Token": token }
    });
    console.log(res.data);
    return res.data ? res.data : "There's nothing in that file!";
  } catch (e) {
    console.log(e.response.data.err);
    return e.response.data.err;
  }
};
