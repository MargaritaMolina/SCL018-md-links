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

          //I need to extract the links from each line
          const lineLinks = line.match(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g); // matching combinations of characters in chains.
          if (lineLinks) {
            lineLinks.forEach((link) => {
              const linkInfo = getLinkInfo(link);
              fileLinks.push({
                href: linkInfo.href,
                text: linkInfo.text,
                file: fileName,
              }); //Creating an object that stores the link info/ Key-value pairs
            });
          }
        });
        if (options.validate) {
          fileLinks.forEach((link) => {
            fetch(link.href) //http request- it gives back a promise object that contains the result.
              .then((response) => {
                link.status = response.status; // object response is given back when when fetch is resolved
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
        }, 5000); //waiting 5 seconds before resolving the promise.
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
