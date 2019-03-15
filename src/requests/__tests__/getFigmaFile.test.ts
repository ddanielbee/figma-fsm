import axios from "axios";
import { getFigmaFile } from "../getFigmaFile";
import { FIGMA_API_URL } from "../constants";

jest.mock("axios", () => ({
  get: jest.fn(() => ({ data: undefined }))
}));

describe("getFigmaFile", () => {
  it("should make a get request with the correct url and token headers", () => {
    const fileKey = "my-figma-file";
    const token = "my-figma-token";
    const expectedUrl = `${FIGMA_API_URL}${fileKey}`;
    getFigmaFile(token, fileKey);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, { headers: { "X-Figma-Token": token } });
  });
});
