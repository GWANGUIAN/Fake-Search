const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  getAccessToken: async (req, res) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/users/auth",
          message: "no accessToken",
        },
      });
    } else {
      const verified = jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET,
        (err, decoded) => {
          if (err) return null;
          return decoded;
        }
      );
      if (!verified) {
        return res.status(401).json({
          data: null,
          error: {
            path: "/users/auth",
            message: "invalid accessToken",
          },
        });
      } else {
        const userData = User.findOne({
          where: {
            identification: verified.identification,
          },
        });
        if (!userData) {
          return res.status(404).json({
            data: null,
            error: "/users/auth",
            message: "user not found",
          });
        }
        return userData;
      }
    }
  },
};