export default {
  isApi: true,
  path: '/api/getGroup/:id',
  handler: (context, req, res) => {
    context.db.query(`SELECT * FROM Groups WHERE obfuscatedId = '${req.params.id || req.params[0]}';`)
      .then(([group]) => {
        context.db.query(`SELECT * FROM Groups_X_Images WHERE groupId = ${group.id};`)
          .then(images => {
            res.send({
              group,
              images
            });
          });
      });
  }
};
