const { response, request } = require("express");
const { ObjectID } = require("mongodb");
let db = require("../database");

let client = db.getClient();
let collection = db.getItemsCollection();
let url = db.getUrl();
let databaseName = db.getDatabase();

exports.getUserItems = (request, response) => {
    const { user_username } = request.body;

    console.log(user_username);

    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);
        dbo.collection(collection).find({ user_username: user_username }).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "Error", error: err });
            }
            else {
                response.status(200).send({ message: "items found successfully", res: result });
                console.log(result);
            }
        })
        db.close();
    });
};

exports.additem = (request, response) => {
    const { username } = request.body;
    const { address } = request.body;
    const { item_price } = request.body;
    const { item_category } = request.body;

    item = {
        username: username,
        address: address,
        item_price: item_price,
        item_category: item_category,
    };

    client.connect(url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(databaseName);
        dbo.collection(collection).insertOne(item, (err, result) => {
            if (err) {
                response.status(500).send({ message: "Error", error: err });
            }
            else {
                response.status(200).send({ message: "item added successfully!", res: result });
                console.log(result);
            }
        })
        db.close();
    });
}

exports.deleteorder = (request, response) => {
    const { data } = request.body;

    console.log(data);

    client.connect(url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(databaseName);
        dbo.collection(collection).deleteOne({ _id: ObjectID(data._id) }, (err, result) => {
            if (err) {
                response.status(500).send({ message: "Error", error: err });
            }
            else {
                response.status(200).send({ message: "Order deleted", res: result });
                console.log(result);
            }
        })
        db.close();

    })
}

exports.deletAllUseData = (request, respone) => {
    const { username } = request.body;

    client.connect(url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(databaseName);
        dbo.collection(collection).deleteMany({ username: username }, (err, result) => {
            if (err) {
                respone.status(500).send({ message: "Error", error: err });
            }
            else {
                respone.status(200).send({ message: "User data deleted", res: result });
                console.log(result);
            }
        })
        db.close();
    })
}

exports.editUserOrder = (request, response) => {
    const { username } = request.body;
    const { address } = request.body;
    const { item_price } = request.body;
    const { item_category } = request.body;

    console.log(username);
    console.log(address);
    console.log(item_price);
    console.log(item_category);

    client.connect(url, (err, db) => {
        if (err) throw err;

        let whereClause = { user_username: username };

        let newValues = { $set: { address: saddress, item_price: item_price, item_category: item_category } };

        let dbo = db.db(databaseName);
        dbo.collection(collection).updateOne(whereClause, newValues, (err, result) => {
            if (err) {
                response.status(500).send({ message: "Error ", error: err });
            }
            else {
                response.status(200).send({ message: "item updated  ", res: result });
            }
        })
        db.close();
    })
}