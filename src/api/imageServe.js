import fs from 'fs';
import Store from '../stores/index';

export default {
  isApi: true,
  path: '/api/images/serve/:imageID',
  handler: (context, req, res) => {
    const id = parseInt(req.params.imageID, 10);
    context.db.query(`SELECT * FROM Images WHERE id = ${id}`).then(results => {
      if (results.length < 1) {
        return res.end('{"error": true}');
      }
      const path = results[0].path;
      console.log(`path for ${id} is "${path}"`);
      fs.readFile(path, (err, data) => {
        if (err) {
          console.log('error', err);
          return res.end('{"error": true}');
        } 
        res.writeHead(200, {'content-type': results[0].mediaType});
        res.end(data)
      });
    });
  }
};
