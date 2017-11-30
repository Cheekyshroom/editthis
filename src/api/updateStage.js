const stageTimes = [
  999999, // irrelevant for starting stage (triggered by image selection)
  30, //
  20, //
  999999, // irrelevant for victory stage
];

export default {
  isApi: true,
  path: '/api/updateStage/:obId/:newStage',
  handler: (context, req, res) => {
    const currentTime = Math.floor(new Date().valueOf() / 1000);
    const query = `
      UPDATE Groups
      SET stage = ${parseInt(req.params.newStage, 10)},
          nextStage = ${currentTime + stageTimes[parseInt(req.params.newStage, 10)]}
      WHERE obfuscatedId = '${req.params.obId}';`;

    context.db.query(query).then(results => {
      res.send({
        success: true,
        obId: req.params.obId,
        stage: parseInt(req.params.newStage, 10)
      });
    });
  }
};
