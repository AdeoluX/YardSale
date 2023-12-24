require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const app = express();
const mongo = require('./src/config/db.config')

mongo

const { errorConverter, errorHandler } = require("./src/middleware/error");
const { authRoutes, productsRoutes, paymentRoutes, orderRoute, transactionRoute } = require("./src/routes");
const ApiError = require("./src/utils/ApiError");
const httpStatus = require("http-status");

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

const loveTexts = [
  "You light up my life like the stars in the night sky ✨❤️",
  "Every moment with you feels like a dream come true 💖",
  "Your smile is my favorite thing in the world 😊💕",
  "I am grateful to have you in my life, Bankebi 💑💘",
  "You make my heart skip a beat every time I see you 💓",
  "Our love story is my favorite story ever told 📖❤️",
  "With you, every day is Valentine's Day 💝",
  "You are the melody to my heart's song 🎶💞",
  "Being with you is the best adventure I've ever had 🌍💑",
  "I fall in love with you more and more each day 💏💗",
  "You are the missing piece to my puzzle 🧩❤️",
  "Your love is the sweetest symphony playing in my heart 🎵💖",
  "Together, we create a love story that's as beautiful as a fairytale 🏰💕",
  "You are the sunshine that brightens my darkest days ☀️💛",
  "Every moment without you feels like a lifetime 🕰️💔",
  "You are my best friend and my greatest love 🤗💘",
  "Our love is like a fine wine; it gets better with time 🍷❤️",
  "I love you more than words can express 💬💗",
  "Your laughter is the music of my heart 🎶😄",
  "You are the reason behind my smiles and the source of my happiness 😊💖",
  "I cherish every second I spend with you 💏💓",
  "Your love is the greatest gift I've ever received 🎁💝",
  "You complete me in every way possible 🧩💑",
  "Our love is the greatest adventure of my life 🚀💕",
  "You are the queen of my heart, and I am your devoted king 👑❤️",
  "Every day with you is a new page of our beautiful love story 📖💞",
  "You are my muse, my inspiration, and my one true love 🌹💘",
  "Our love is like a fine piece of art, beautiful and timeless 🎨❤️",
  "You are my anchor in the storms of life ⚓💖",
  "I am blessed to share my life with someone as amazing as you 💑💕",
  "Your love is the sweetest melody that plays in the symphony of my heart 🎵💓",
  "You are the reason why my heart beats a little faster 💓💗",
  "You are my forever and always, my love 💖💑",
  "With you, every day is Valentine's Day 💖🌹",
  "You are the rainbow that colors my gray skies 🌈💕",
  "Your love is the magic that turns ordinary moments into extraordinary memories ✨❤️",
  "In your arms, I've found my safe haven 🤗💘",
  "You are my greatest joy and my deepest love ❤️😊",
  "Every day with you is a blessing and a gift 💏🎁",
  "You are the love of my life, my soulmate, and my best friend 💑💖",
  "Our love is a journey, and I'm grateful to walk it with you 🚶‍♂️🚶‍♀️❤️",
  "Your love is the anchor that keeps me grounded in the storms of life ⚓🌊",
  "I am thankful for the beautiful love we share every single day 💞❤️",
  "You are the reason my heart smiles, and my world is brighter with you in it 😊🌟",
  "Our love is like a beautiful garden, growing more beautiful with each passing day 🌷💑",
  "You are my heart's desire, and I am forever yours ❤️💑",
  "You are my sunshine, my moonlight, and all the stars in my night sky ☀️🌙✨"
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res)=>{
  const dynamicText = loveTexts[Math.floor(Math.random() * loveTexts.length)];
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }

        .centered-text {
          text-align: center;
          font-size: 24px;
        }
      </style>
      <title>I LOVE YOU ❤️❤️ ❤️❤️ BANKEBI AKINSOLA ❤️❤️ ❤️❤️, NEVER DOUBT IT!! ❤️❤️ ❤️❤️</title>
    </head>
    <body>
      <div class="centered-text">Bankebi Akinsola, ${dynamicText}</div>
    </body>
    </html>
  `;
  res.send(html)
})

app.use("/api/v1/pay", paymentRoutes);
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products", productsRoutes)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/transaction", transactionRoute)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

//module.exports.handler = serverless(app);
