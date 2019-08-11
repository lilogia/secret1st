const port = process.env.PORT || 3010,
    layouts = require("express-ejs-layouts"),
    errorController = require("./controllers/errorController"),
    secretController = require("./controllers/secretController"),
    express = require("express"),
    app = express();

app.set("port", port);
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
    //res.send("Welcome to Secret1st!");
    res.render("index");
});

app.get("/newSecret", secretController.newSecret);
app.get("/listSecrets", secretController.getAllSecrets);
app.get("/allSecrets", secretController.getAllSecrets);
app.get("/edit", secretController.editSecret);
app.get("/delete", secretController.deleteSecret);
app.post("/saveSecret", secretController.saveSecret);
app.post("/modifySecret", secretController.modifySecret);

app.use(errorController.errorPageNotFound);
app.use(errorController.errorInternalServer);

app.listen(app.get("port"), () => {
    console.log(`Server started. It is running at http://localhost:${app.get("port")}`);
});