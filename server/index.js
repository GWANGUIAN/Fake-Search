require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


/*sequelize 설정*/
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: "mysql",
      port: process.env.DATABASE_PORT,
      logging: console.log,
      logging: (...msg) => console.log(msg),
    }
  );
  
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("successfully connected");
    } catch (error) {
      console.log("unalbe to connect to the database", error);
    }
  };
  testConnection();

// 서버 설정
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cookieParser());
app.use(express.json({ strict: false }));
app.use(cors(corsOptions));

let server = app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is starting on ${process.env.PORT}`);
});

module.exports = server;
