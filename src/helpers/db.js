import mysql from 'mysql';
import fs from 'fs';

const connect = () => {
  return mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'editthis',
    multipleStatements: true
  });
};

const query = (connection, query) => {
  return new Promise((resolve, error) => {
    return connection.query(query, (err, result) => {
      if (err) {
        return error(err);
      }

      return resolve(result);
    });
  });
};

const initialize = (debug = true) => {
  const Db = connect();
  const initial = fs.readFileSync('initial.sql', 'utf8');
  Db.connect(err => {
    query(Db, initial).then(results => {
      if (debug) {
        console.log('Initial payload  got ', results);
      }
    });
  });
  return {
    db: Db,
    query: (q) => query(Db, q)
  };
}

export default {
  initialize,
  connect,
  query
};
