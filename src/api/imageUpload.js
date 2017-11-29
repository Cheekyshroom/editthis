import fs from 'fs';
import Store from '../stores/index';

export default {
  isApi: true,
  path: '/api/images/upload',
  handler: (context, req, res) => {
    context.db.query('SELECT max(id) as id FROM Images;').then(([{id}]) => {
      const path = `pictures/${id || 0}.img`;

      console.log(`uploading "${req.body.image}" to "${path}"`);
      console.log(`INSERT INTO Images (path) VALUES ('${path}');`);

      fs.writeFile(path, req.body.image, err => {
        if (err) {
          throw err;
        }
        context.db.query(
          `INSERT INTO Images (path) VALUES ('${path}');`
        ).then(() => {
          res.end(`{"id": ${id || 0}}`);
        });
      });
    });
  }
};
