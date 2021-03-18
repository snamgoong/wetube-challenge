import express from "express";

const app = express();

const consoleLog = (req, res, next) => {
    console.log("I'm a middleware");
    next();
    }

const backToIndex = (req, res, next) =>{
    res.redirect("/");
    next();
};

const index = (req, res) => res.render("Index");
const aboutUs = (req, res) => res.render("About Us");
const contact = (req, res) => res.render("Contact");
const protected = (req, res) => res.render("Protected");

app.use(consoleLog);
app.get("/", index);
app.get("/about-Us", aboutUs);
app.get("/contact", contact);
app.use(backToIndex);
app.get("/protected", protected);
