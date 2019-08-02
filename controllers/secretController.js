const Secret = require("../models/secret");

exports.newSecret = (req, res) => {
    res.render("secret");
};

exports.getAllSecrets = (req, res, next) => {
    Secret.find({}, (error, secrets) => {
        if (error) next(error);
        //req.data = secrets;
        res.render("listSecrets", {
            secrets: secrets
        });
    });
/*    res.render("listSecrets", {
        secrets: secrets
    });*/
};

exports.listSecrets = (req, res) => {
    let listSecrets = [
        new Secret({
            secret: "123",
            url: "http://google.com",
            name: "lilo",
            password: "abc"
        }),
        new Secret({
            secret: "1232",
            url: "http://google.com1",
            name: "lilo",
            password: "abc"
        })
    ];
    res.render("listSecrets", {
        secrets: listSecrets
    });
};

exports.saveSecret = (req, res) => {
    let newSecret = new Secret({
        secret: req.body.secret,
        url: req.body.url,
        name: req.body.name,
        password: req.body.password
    });

    console.log(`Secret obj is created: ${newSecret}`);

    newSecret.save()
        .then(() => {
            //res.render("listSecrets");
            this.getAllSecrets(req, res, null);
        })
        .catch(error => {
            if (error) res.send(error);
        });
};