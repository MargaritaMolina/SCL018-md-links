// module.exports = () => {};
// const fetch = require('node-fetch');
import fetch from "node-fetch";
import fs from "fs/promises";
import { getFilePath, getLinkInfo } from "./utils.js";

const mdLinks = (fileName, options = { validate: false }) => {
  const filePath = getFilePath(fileName);
  let fileLinks = [];
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8") // Read the file
      .then((res) => {
        res.split(/\r?\n/).forEach((line) => {
          //regular expression that separates lines in JavaScript

          //necesito extraer los enlances de cada linea
          const lineLinks = line.match(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g);
          if (lineLinks) {
            lineLinks.forEach((link) => {
              const linkInfo = getLinkInfo(link);
              fileLinks.push({
                href: linkInfo.href,
                text: linkInfo.text,
                file: fileName,
              });
            });
          }
        });
        if (options.validate) {
          fileLinks.forEach((link) => {
            fetch(link.href)
              .then((response) => {
                link.status = response.status;
                if (response.status <= 400) {
                  link.ok = true;
                } else {
                  link.fail = true;
                }
              })
              .catch(() => {
                link.fail = true;
              });
          });
        }
        setTimeout(() => {
          resolve(fileLinks);
        }, 5000); //Se espera 5 segundos antes de resolver la promesa.
      })
      .catch((error) => {
        if (error && error.code === "ENOENT") {
          // Error NO ENTry
          reject("the file does not exist");
        }
      });
  });
};
export default mdLinks;
