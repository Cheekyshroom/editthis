import fs from 'fs';
import Store from '../stores/index';

export default {
  isApi: true,
  path: '/api/images/upload',
  handler: (context, req, res) => {
    context.db.query('SELECT max(id) as id FROM Images;').then(([{id}]) => {
      const path = `pictures/${(id || 0) + 1}.img`;
      fs.writeFile(path, new Buffer(req.body.image, 'binary'), err => {
        if (err) {
          throw err;
        }
        context.db.query(
          `INSERT INTO Images (path, mediaType) VALUES ('${path}', 'image/jpeg');`
        ).then(() => {
          res.end(`{"id": ${(id || 0) + 1}}`);
        });
      });
    });
  }
};
