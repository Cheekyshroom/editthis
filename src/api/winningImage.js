export default {
  isApi: true,
  path: '/api/getWinningImage/:obId',
  handler: (context, req, res) => {
    context.db.query(`SELECT * FROM Groups WHERE obfuscatedId = '${req.params.obId || req.params[0]}';`)
      .then(([group]) => {
        if (group) {
          context.db.query(
            `SELECT * FROM Groups_X_Images
             JOIN Images ON (imageId = id)
             WHERE groupId = ${group.id}  
             GROUP BY imageId
             ORDER BY votes DESC
             LIMIT 1;`
          ).then(([image]) => {
            res.send(`{"id": ${image.imageId}}`);
          });
        } else {
          res.send({
            error: true
          });
        }
      });
  }
};
