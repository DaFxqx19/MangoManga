// För själva servern
const express = require("express");
const app = express();
const jsonMeny = require("./Mangas.json");

// Kräv JSON filen
// const data = require("./ordlista.json");

// För att kunna skicka tillbaka html filer till en användare
const path = require("path");

// Behöver egentligen inte göra detta steg
// Skapa en variabel som berättar vilken port vi lyssnar på
const port = 3000;
// För att våra html filer ska kunna komma åt en css fil t.ex.
// Vi lägger då alla dessa filer i en mapp som heter public
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/Main.html"));
});
// Skapa dina paths här!
app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "views/Profile.html"));
});

app.get("/loadIn", (req, res) => {
    // console.log(searchTerm, page);
    res.send(jsonMeny);
});

// Starta servern och säg vilken port den ska lyssna på
app.listen(port);
// Gör en liten consol log så att användaren vet att allt gick bra
console.log("Server is up and running at port " + port);
