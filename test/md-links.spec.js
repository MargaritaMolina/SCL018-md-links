/* eslint-disable no-undef */
import { mdLinks } from "../src/index.js";
import { getFilePath, getLinkInfo } from "../src/utils.js";

describe("mdLinks", () => {
  it("should be a function", () => {
    expect(typeof mdLinks).toBe("function");
  });
  //   it("should return a promise", () => {
  //     const filePath = "links.md";
  //     const result = mdLinks(filePath);
  //     expect(result).toBeInstanceOf(Promise);
  //   });
  // });
  describe("getFilePath", () => {
    it("should be a function", () => {
      expect(typeof getFilePath).toBe("function");
    });
    it("should return the file path", () => {
      const fileName = "links.md";
      const filePath = getFilePath(fileName);
      expect(filePath).toBe(fileName);
    });
  });
  describe("getLinkInfo", () => {
    it("should be a function", () => {
      expect(typeof getLinkInfo).toBe("function");
    });
    it("should return an array with href and text", () => {
      const link =
        "[Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)";
      const linkInfo = getLinkInfo(link);
      expect(linkInfo).toBeInstanceOf(Array);
    });
  });
});
