const Secret = require("../models/secret");

exports.newSecret = (req, res) => {
    res.render("secret", {
        secret: null
    });
};

exports.editSecret = (req, res) => {
    let secretName = req.query.secret;
    console.log(`Find ${secretName}...`);
    Secret.findOne({secret: secretName}, (error, secret) => {
        if (error) res.send(error);
        res.render("secret", {
            secret: secret
        });
    });
}

exports.deleteSecret = (req, res) => {
    let secretName = req.query.secret;
    console.log(`Delete ${secretName}...`);
    Secret.findOneAndDelete({secret: secretName}, (error, secret) => {
        if (error) res.send(error);
        res.render("secret", {
            secret: secret 
        });
    });
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
            pwd: "abc"
        }),
        new Secret({
            secret: "1232",
            url: "http://google.com1",
            name: "lilo",
            pwd: "abc"
        })
    ];
    res.render("listSecrets", {
        secrets: listSecrets
    });
};

exports.modifySecret = (req, res) => {
    let newSecret = new Secret({
        _id: req.body._id,
        secret: req.body.secret,
        url: req.body.url,
        name: req.body.name,
        pwd: req.body.pwd
    });
    console.log(`Secret obj will be modified: ${newSecret}`);
    Secret.findOneAndUpdate(
        {_id: newSecret._id}, newSecret, (error, secret) => {
            if (error) res.send(error);
            this.getAllSecrets(req, res, null);
        }
    );
};

exports.saveSecret = (req, res) => {
    let newSecret = new Secret({
        secret: req.body.secret,
        url: req.body.url,
        name: req.body.name,
        pwd: req.body.pwd
    });

    console.log(`Secret obj is created: ${newSecret}, ${newSecret.pwd}`);

    newSecret.save()
        .then(() => {
            //res.render("listSecrets");
            this.getAllSecrets(req, res, null);
        })
        .catch(error => {
            if (error) res.send(error);
        });
};