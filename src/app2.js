import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import logger from "morgan";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import errorHandler from "errorhandler";
import routes from "./routes";
import object  from "./routes/object";
import path  from "path";
import fs from "fs";
import cors  from "cors";
import {format} from "util";
import formidable from "formidable";

//import favicon from "static-favicon";
//import methodOverride from "method-override";
//import user  from "./routes/user";
//import http  from "http";

const app = express();
const port = parseInt(process.env.PORT) || 3000;
const env = process.env.NODE_ENV || "development";

app.use(compression());

app.set("port", port);
app.set("views",  __dirname + "/views");
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger("combined"));

app.use(cookieParser("your secret here"));

app.use(expressSession({
    secret: "your secret here",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "../lib"))); // to get CSGTree.js


if ("development" == env) {
    app.use(errorHandler());
}

app.use(cors());

app.get("/test", function (req, res) {
    res.render("sample", {});
});

app.get("/viewer", function (req, res) {
    console.log(" viewer requested");
    res.render("viewer", {});
});

app.get("/", routes.index);
app.post("/csg1", object.buildCSG1);
app.post("/load_cadfile", object.load_cadfile);



app.post("/file-upload", function (req, res) {

    const form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, "uploads");


    const jsonResult = {files: []};
    form.on("fileBegin", function (name, file) {
    });

    form.on("file", function (name, file) {
        console.log("Uploaded " + file.name);
        jsonResult.files.push({
            "name": file.name,
            "size": file.size,
            "path": path.posix.join("/uploads", path.basename(file.name))
        });

        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    form.on("error", function (err) {
        console.log("An error has occurred: \n" + err);
    });

    form.on("end", function () {
    });

    form.parse(req, function (err, fields, files) {

        res.send(jsonResult);
    });

});


// http.createServer(app).listen(app.get("port"), function(){
app.listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
