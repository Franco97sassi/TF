const { Router } = require("express");
const { User, Contador, Product, Color, Stock, Category  } = require("../../db");

const path = require('path');

const fs = require('fs');
const axios = require("axios")



const isUserLoggedIn = require("../../middlewares/auth")
const isUserLoggedInAdmin = require("../../middlewares/authAdmin")

const {
  userLogin,
  userSingIn,
  getUser,
  confirmAccount,
  userLogOut,
  forgotPassword,
  newPassword,
  sendConfirmationEmail2,
  subscribeUser,
  unsubscribeUser,
} = require("../../controllers/usersControllers/users.controllers");



// Importar todos los routers;

const router = Router();


router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
});


router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Color, as: 'colors' },
        { model: Stock },
        { model: Category, as: 'categories' } // Incluye el modelo Category como 'categories'
      ]
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

router.post("/singin", userSingIn);

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userLogin(email, password, res);
    res.json({
      user,
    });
  } catch (error) {
    console.log(error)
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    let { userId } = req.body;
    console.log(req.body);
    let user = await getUser(userId, res);
    res.json({
      user,
    });
  } catch (error) {
    console.log(error)
  }
});


router.get("/protected", isUserLoggedIn, (req, res) => {
  try {
    const user = req.user; // Acceder a los datos del usuario obtenidos en el middleware
    // Realizar acciones con los datos del usuario aquí
    res.json({ user, msg: "Acceso autorizado" });
  } catch (error) {
    // Ocurrió un error, enviar respuesta de error
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/users", isUserLoggedInAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ where: { banned: false } });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/notification", isUserLoggedInAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ where: { emailVerified: false } });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});


router.get("/contador", async (req, res) => {
  try {
    const contador = await Contador.findByPk(1);
    res.json({ contador });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});


router.post("/banear", isUserLoggedIn, async (req, res) => {
  try {
    const { id } = req.body;

    // Buscar el usuario por ID en la base de datos
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.banned = true;
    user.emailVerified = true
    await user.save();

    res.json({ message: "Cuenta Baneada" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/totalcompras", async (req, res) => {

  try {
    const id = req.query.id; 
    if(id.length> 1 ){
      const user = await User.findOne({ where: { id: id } })
      if (!user) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    return res.json(user.totalCompras);
    }
    res.status(200).send("Sin id, es invitado.")
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
})
 
router.get("/confirm/:token", confirmAccount);
router.post("/forgot-password", forgotPassword)
router.post("/new-password/:token", newPassword)

module.exports = router;
