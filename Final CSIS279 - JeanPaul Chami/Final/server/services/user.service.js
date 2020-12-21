const { ObjectID } = require("mongodb");
let db = require("../database");

let client = db.getClient();
let url = db.getUrl();
let databaseName = db.getDatabase();
let collectionName = db.getUserCollection();

exports.getUser = (request, response) => {
  const { username } = request.body;
  const { password } = request.body;

  let account = {
    username: username,
    password: password,
  };

  client.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db(databaseName);
    dbo.collection(collectionName).find(account).toArray(function (err, result) {
      if (err) {
        response.status(500).send({ message: "Error" });
      }
      else {
        if (result.length === 1) {
          response.status(200).send({ message: "Account found", res: result });
        }
        else {
          response.status(500).send({ message: "Account not found", res: result });
        }
      }

    });
  })
};

exports.create = (req, response) => {
  const { Username } = req.body;
  const { pass } = req.body;
  const { name } = req.body;
  const { age } = req.body;


  let user = {
    username: Username,
    password: pass,
    name: name,
    age: age,
  };

  client.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db(databaseName);
    dbo.collection(collectionName).insertOne(user, (err, res) => {
      if (err) {
        response.status(500).send({ message: "Error" });
      }
      else {
        response.status(200).send({ message: "User added", result: res });
      }
      db.close();
    })
  })
};



exports.deleteUser = (req, res) => {
  const { username } = req.body;
  const { pass } = req.body;

  client.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db(databaseName);

    dbo.collection(collectionName).deleteOne({ username: username, password: pass }, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Error" });
      }
      else {
        res.status(200).send({ data: result, message: "User deleted" });
      }
      console.log(result);
      db.close();
    })
  })

};

exports.updatePass = (req, response) => {
  const { password } = req.body;
  const { username } = req.body;

  client.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db(databaseName);

    let whereClause = { username: username };

    let newValues = { $set: { password: password } };

    dbo.collection(collectionName).updateOne(whereClause, newValues, (err, res) => {
      if (err) {
        response.status(500).send({ message: "Eror", error: err });
      }
      else {
        response.status(200).send({ message: "Password updated", result: res });
      }
      console.log(res);
      db.close();
    })
  })
};






