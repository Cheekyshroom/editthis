export default {
  isApi: true,
  path: '/api/addUser/:name/:age',
  handler: (context, req, res) => {
    console.log('Adding', req.params, 'to users');
    context.db.query(`INSERT INTO Groups_X_Images values (${parseInt(req.params.name, 10)}, ${parseInt(req.params.age)})`);
    res.end();
  }
};
