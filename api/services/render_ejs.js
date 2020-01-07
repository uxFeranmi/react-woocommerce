const ejs = require('ejs');
const fs = require('fs');

const renderEjs = (filePath, data)=> {
  /*if (/htm(l)?$/.test(path.extname(filePath)))
    return fs.readFileSync(filePath).toString();*/

  const template = fs.readFileSync(filePath).toString();
  const html = ejs.render(template, data);
  return html;
}

module.exports = renderEjs;
