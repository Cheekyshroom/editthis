import fs from 'fs';
import Store from '../stores/index';

export default {
  isApi: true,
  path: '/api/images/serve/:imageID',
  handler: (req, res) => {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    //res.set('Content-Type', 'image/jpeg');
    //res.send(fs.readFileSync(`pictures/${req.params.imageID}`, 'utf8'));
    fs.readFile(`pictures/${req.params.imageID}`,(err,data) => {res.end(data)});
  }
};
