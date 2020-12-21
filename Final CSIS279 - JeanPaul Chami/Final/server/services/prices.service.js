let db = require("../database");

let client = db.getClient();
let collection = db.getPricesCollection();
let url = db.getUrl();
let databaseName = db.getDatabase();

exports.getPrices = (request, response) => {
    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);
        dbo.collection(collection).find({}).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "Error", error: err });
            }
            else {
                response.status(200).send({ message: "Prices found!", res: result });
            }
        });
        db.close();
    });
}

