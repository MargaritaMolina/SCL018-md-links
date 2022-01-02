import mdLinks from "./index.js";
const fileName = process.argv[2];
const validate = process.argv[3];
const options = {};
if (validate === "--validate") {
  options.validate = true;
}
mdLinks(fileName, options)
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);
