import ejs from 'ejs';
import fs from 'fs';

const renderEjs = (path, data)=> {
  const template = fs.readFileSync(path).toString();
  const html = ejs.render(template, data);
  return html;
}

export default renderEjs;
