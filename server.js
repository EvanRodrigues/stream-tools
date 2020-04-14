const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express"),
    app = express(),
    port = process.env.PORT || 5000;

//Body parser middleware
app.use(express.json());
app.use(cors());

// DB Config
const db = process.env.MONGO_URI || require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

//Get api routes.
app.use("/api/goal", require("./routes/api/goal"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    //Static folder set up.
    app.use(express.static(path.join(__dirname, "public")));
}

//Get api routes.
app.use("/api/goal", require("./routes/api/goal"));

app.listen(port);
