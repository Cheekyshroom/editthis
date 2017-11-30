export default {
  isApi: true,
  path: '/api/setWinImage/:obId/:newImage',
  handler: (context, req, res) => {
    const query = `
      UPDATE Groups
      SET winImage = ${parseInt(req.params.newImage, 10)}
      WHERE obfuscatedId = '${req.params.obId}';`;

    context.db.query(query).then(results => {
      res.send({
        success: true,
        obId: req.params.obId,
        image: parseInt(req.params.newImage, 10)
      });
    });
  }
};
