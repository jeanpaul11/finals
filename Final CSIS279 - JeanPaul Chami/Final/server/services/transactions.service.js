let db = require("../database");

let client = db.getClient();
let collection = db.getTransactionsCollection();
let url = db.getUrl();
let databaseName = db.getDatabase();

exports.getPaymentType = (request, response) => {
    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);
        dbo.collection(collection).find({}).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "Error", error: err });
            }
            else {
                response.status(200).send({ message: "Type found!", res: result });
            }
        });
        db.close();
    });
}
