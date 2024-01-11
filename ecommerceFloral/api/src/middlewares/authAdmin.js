const jwt = require("jsonwebtoken");
const authConfig = require("../controllers/config/auth");
const { User } = require("../db");

const isUserLoggedInAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ msg: "No authorization" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, authConfig.secret, async (err, decoded) => {
      if (err) {
        return res.json({ msg: "No authorization" });
      } else {
        try {
          const userId = decoded.user;
          console.log(userId)
          const user = await User.findByPk(userId.id);
          if (!user) {
            return res.json({ msg: "User not found" });
          }
          if (user.admin) { // Verificar si el usuario es administrador
            req.user = user;
            next();
          } else {
            return res.json({ msg: "Unauthorized" });
          }
        } catch (error) {
            console.log(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  }
};

module.exports = isUserLoggedInAdmin;