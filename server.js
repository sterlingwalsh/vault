const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const game = require("./routes/game");
const vault = require("./routes/vault");
const steamapi = require("./routes/steamapi");
const inventory = require("./data/inventory");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

if (process.env.NODE_ENV === "development") {
  console.log("in dev");
  app.use(cors());
} else if (process.env.NODE_ENV === "production") {
  app.use(cors(corsOptions));
}

app.get("/vault", (req, res) => vault.getVault(req, res));

app.post("/gameDetails", async (req, res) => {
  Promise.all(req.body.ids.map(id => steamapi.getGameInfo(id))).then(result =>
    res.json(result)
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(process.env.PORT);

console.log("Server started on port", process.env.PORT);
