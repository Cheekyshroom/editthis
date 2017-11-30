import fs from 'fs';
import Store from '../stores/index';

export default {
  isApi: true,
  path: '/api/images/vote/:imageId',
  handler: (context, req, res) => {
    const id = parseInt(req.params.imageId, 10);

    context.db.query(
      `SELECT votes FROM Images WHERE id = ${id};`
    ).then(([{votes}]) => {
      context.db.query(
        `UPDATE Images SET votes = ${votes + 1} WHERE id = ${id};`
      ).then(r => {
        res.end({
          success: true
        });
      });
    });
  }
};
