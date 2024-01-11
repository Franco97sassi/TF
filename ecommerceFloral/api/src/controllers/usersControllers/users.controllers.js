const { User, Favorites } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.js");
const nodemailer = require("nodemailer");
const { changePasswordNotification } = require("./notifications/notifications")
const { HOST_EMAIL, PORT_EMAIL, EMAIL, EMAIL_PASS, DB_HOST, DB_PORT, CLIENT_PORT, REACT_APP_HOST } =
  process.env;

const userSingIn = async (req, res, next) => {
  // Verificar si req.body es null o undefined
  if (req.body === null || req.body === undefined) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }

  // Obtener los datos del cuerpo de la solicitud
  const { username, email, password } = req.body;

  // Verificar si los campos requeridos están presentes
  if (!username || !email || !password) {
    res.status(400).send({ message: "Missing required fields" });
    return;
  }

  let passwordCryp = bcrypt.hashSync(
    password,
    Number.parseInt(authConfig.rounds)
  );

  try {
    const usernameCreate = await User.findOne({
      where: { username: username },
    });
    const emailCreate = await User.findOne({ where: { email: email } });

    if (usernameCreate) {
      res.status(400).send({ message: "El nombre de usuario ya esta en uso" });
    } else if (emailCreate) {
      res.status(400).send({ message: "Email en uso, por favor elige otro" });
    } else if (!usernameCreate && !emailCreate) {
      User.create({
        username: username,
        email: email,
        password: passwordCryp,
      })

        .then((user) => sendConfirmationEmail(user))
      res.send({ message: "Usuario creado correctamente, ya puedes iniciar sesion !" });
    }
  } catch (err) {
    res.status(400).send(err);
    console.log('Password:', password);
    console.log('Rounds:', authConfig.rounds);
  }
};

const getUser = async (id, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new Error("Usuario y/o contraseña incorrectos!");
    } else {
      if (user.banned || !user.emailVerified) {
        throw new Error("No estas autorizado, deberas esperar a que un administrador te habilite");
      } else {
        let token = jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });
        return token
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};


const userLogin = async (email, password, res) => {
  try {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    // console.log(user)
    if (!user) {
      throw new Error("Usuario y/o contraseña incorrectos!");
    } else {
      if (user.banned || !user.emailVerified) {
        throw new Error("No estas autorizado, deberas esperar a que un administrador te habilite");
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });
          user.update({ logged: true });
          // console.log('1',user.logged)
          setTimeout(function () {
            user.update({ logged: false });
          }, 5000); // a los 5 minutos se pone el status del logged en false
          // console.log('user y token', user, token)
          return token
        } else {
          throw new Error("Email o contraseña incorrecto!");
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const userLogOut = async (user, token) => {
  try {
    const actualUser = await User.findByPk(user.id);
    if (!actualUser) {
      throw new Error("user not found");
    } else {
      const newToken = jwt.sign({ user: actualUser }, authConfig.secret, {
        expiresIn: 30,
      });
      if (actualUser.logged) {
        setTimeout(function () {
          actualUser.update({ logged: false });
        }, 10000);
      }
      return {
        user: actualUser.dataValues,
        token: newToken,
      };
    }
  } catch (error) {
    console.log(error);
  }
};



// send Email confirmation
function sendConfirmationEmail(user) {
  let transporter = nodemailer.createTransport({
    host: `${HOST_EMAIL}`,
    port: `${PORT_EMAIL}`,
    secure: false,
    auth: {
      user: `${EMAIL}`,
      pass: `${EMAIL_PASS}`,
    },
  });
  var token = jwt.sign({ email: user.email }, authConfig.secret);
  //const urlConfirm = `http://${REACT_APP_HOST}/confirm-account/${token}`;

  return transporter
    .sendMail({
      from: "nutri.u.contact@gmail.com",
      to: user.email,
      subject: "Cuenta PixieBr Creada Correctamente",
      html: `<p>Su cuenta fue creada correctamente, debera esperar que un administrador acepte su registro para poder iniciar sesion. `,
    })
    .then(() => user);
}

function sendConfirmationEmail2(user) {
  let transporter = nodemailer.createTransport({
    host: `${HOST_EMAIL}`,
    port: `${PORT_EMAIL}`,
    secure: false,
    auth: {
      user: `${EMAIL}`,
      pass: `${EMAIL_PASS}`,
    },
  });
  var token = jwt.sign({ email: user.email }, authConfig.secret);
  //const urlConfirm = `http://${REACT_APP_HOST}/confirm-account/${token}`;

  if (user.emailVerified) {
    return transporter
      .sendMail({
        from: "nutri.u.contact@gmail.com",
        to: user.email,
        subject: "Su cuenta fue habilitada por un administrador",
        html: `<p>Ya puedes iniciar sesion en Pixie Bienes Raices. `,
      })
  } else {
    return transporter
      .sendMail({
        from: "nutri.u.contact@gmail.com",
        to: user.email,
        subject: "Su cuenta fue inhabilitada por un administrador, contactate si crees que es un error",
        html: `<p>Contacta con un administrador. `,
      })
  }
}



const confirmAccount = async (req, res) => {
  // confirmar cuenta controller
  try {
    confirmAccount2(req.params.token)
      .then(() => {
        res
          .status(200)
          .send({ succes: true, message: "user confirmed succesfully" });
      })
      .catch((err) =>
        res.status(400).send({ succes: false, message: err.message })
      );
  } catch (err) {
    console.log(err);
  }
};

async function confirmAccount2(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, authConfig.secret);
    email = payload.email;
  } catch (err) {
    throw new Error("Ups!, token is invalid");
  }

  User.update(
    { emailVerified: true },
    {
      where: {
        email: email,
      },
    }
  );
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    if (!email) {
      res.send({ message: "Insert email" })

    } else if (email) {

      const oldUser = await User.findOne({ where: { email: email } })


      if (!oldUser) {
        res.status(400).send({ message: "Email no exist" })
      }
      else if (oldUser) {
        var token = jwt.sign({ email: oldUser.email }, authConfig.secret, { expiresIn: "5m" });
        changePasswordNotification(email, token)
        res.send({ message: "An email to recover password was sent successfully, check your email" })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const newPassword = async (req, res) => {
  let { token } = req.params
  let { password } = req.body


  let passwordCryp = bcrypt.hashSync(
    password,
    Number.parseInt(authConfig.rounds)
  );

  try {
    const payload = jwt.verify(token, authConfig.secret);
    let email = payload.email;
    User.update(
      { password: passwordCryp },
      {
        where: {
          email: email,
        },
      })

    res.send({ message: "Your password was successfully modified" })
  } catch (error) {
    res.status(400).send({ message: "Your session expired, or token is invalid" })
  }
}


const unsubscribeUser = async (req, res) => {
  const userId = req.user.id; // Obtén el ID del usuario logueado desde la solicitud

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send({ message: "Usuario no encontrado" });
      return;
    }

    // Actualiza los valores de suscripción
    user.suscripto = false;
    user.tipoSuscripcion = null;
    user.fechaRenovacion = null;

    await user.save();

    res.send({ message: "Usuario desuscrito exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al desuscribir al usuario" });
  }
};

module.exports = {
  userSingIn,
  userLogin,
  userLogOut,
  getUser,
  confirmAccount,
  forgotPassword,
  newPassword,
  sendConfirmationEmail2,
  unsubscribeUser
};