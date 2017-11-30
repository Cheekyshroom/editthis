export default {
  isApi: true,
  path: '/api/addImage/:obId/:newImage',
  handler: (context, req, res) => {
    context.db.query(`SELECT * FROM Groups WHERE obfuscatedId = '${req.params.obId || req.params[0]}';`)
      .then(([group]) => {
        if (group) {
          const query = `
            INSERT INTO Groups_X_Images (groupId, imageId)
            VALUES (${group.id}, ${parseInt(req.params.newImage, 10)});
          `;

          context.db.query(query).then(results => {
            res.send({
              success: true,
              obId: req.params.obId,
              image: parseInt(req.params.newImage, 10)
            });
          });
        }
      });
  }
};
