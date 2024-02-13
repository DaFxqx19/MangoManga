// För själva servern
const express = require("express");
const app = express();
const jsonMeny = require("./Mangas.json");
let favorites = [];

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

// OBS test only
app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "views/test.html"));
});
// OBS test only

app.get("/loadIn", (req, res) => {
    // console.log(searchTerm, page);
    res.send(jsonMeny);
});
app.get("/favorites", (req, res) => {
    res.send(favorites);
});

app.post("/addFav/:id", (req, res) => {
    const mangoId = req.params.id;
    console.log(mangoId);

    const found = favorites.findIndex(mango => mango == mangoId);

    if (found === -1) {
        favorites.push(mangoId);
    }
    console.log(favorites);
    res.send(`Manga ${mangoId} was added to the Favorites`);
});

app.delete("/removeFav/:id", (req, res) => {
    const mangoId = req.params.id;
    favorites = favorites.filter(id => id !== mangoId);
    console.log(favorites);

    res.send(`Manga ${mangoId} was removed from the Favorites`);
});

// Starta servern och säg vilken port den ska lyssna på
app.listen(port);
// Gör en liten consol log så att användaren vet att allt gick bra
console.log("Server is up and running at port " + port);
