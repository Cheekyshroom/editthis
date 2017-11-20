export default {
  isApi: true,
  path: '/api/createGroup/:obId',
  handler: (context, req, res) => {
    const query = `
INSERT INTO Groups (obfuscatedId, mainImage, stage)
  VALUES ('${req.params.obId}', 0, 0);
    `;
    context.db.query(query).then(results => {
      res.send({
        success: true,
        obId: req.params.obId
      });
    });
  }
};
