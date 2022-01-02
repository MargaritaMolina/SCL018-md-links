import path, { resolve } from "path";

export const getFilePath = (fileName) => {
  let filePath = fileName; // the path is the file name
  if (!path.isAbsolute(filePath)) {
    filePath = resolve(filePath); //Make path absolute
  }
  const fileExt = path.extname(filePath);
  if (fileExt !== ".md") {
    throw new Error(" the file has an invalid extension"); // throw error when the extension is not md
  }
  return filePath;
};

export const getLinkInfo = (link) => {
  let href = link.match(/\((https?:\/\/[^\s)]+)\)/g); // returns an array with links
  href = href[0];
  href = href.replace("(", "");
  href = href.replace(")", "");
  let text = link.match(/\[([^\]]+)]/g); // returns a text array
  text = text[0];
  text = text.replace("[", "");
  text = text.replace("]", "");
  return { href, text }; // link info
};
