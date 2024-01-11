const jwt = require("jsonwebtoken");
const authConfig = require("../controllers/config/auth");
const { User } = require("../db");

const isUserLoggedIn = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ msg: "No authorization" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, authConfig.secret, async (err, decoded) => {
      if (err) {
        return res.json({ msg: "No authorization" });
      } else {
        try {
          const userId = decoded.user // Suponiendo que el ID del usuario está presente en el token
          //const user = await User.findById(userId); // Obtener los datos del usuario desde la base de datos
          
          req.user = userId; // Agregar los datos del usuario al objeto req para que estén disponibles en las rutas posteriores
          next();
        } catch (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  }
};

module.exports = isUserLoggedIn;
