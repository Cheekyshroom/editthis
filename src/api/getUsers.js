export default {
  isApi: true,
  path: '/api/users',
  handler: (context, req, res) => {
    context.db.query('SELECT * FROM Groups_X_Images').then(results => {
      res.send(results);
    });
  }
};
