const mercadopago = require('mercadopago');
const axios = require("axios")
const { Orden, User } = require('../../db')
const { v4: uuidv4 } = require('uuid');

const {
  NOTIFICATION_MERCADOPAGO_FRONT,
  NOTIFICATION_MERCADOPAGO_BACK,
  MP_TOKEN,
  TWILIO_SID,
  TWILIO_TOKEN
} = process.env;

//whatsapp 
const accountSid = TWILIO_SID;
const authToken = TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

const tokenmp = MP_TOKEN;

const postPagar = async (req, res) => {

  mercadopago.configure({
    access_token: tokenmp,
    sandbox: false,
  });

  const preferenceId = uuidv4();

  try {
    const { cart, senderName, receiverName, deliveryType, address, cellphone, pickupTime, userId, username, totalCompras, description } = req.body;

    // Validar que se haya proporcionado el array de productos
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).send({ msg: 'No se proporcionaron productos válidos' });
    }

    if (totalCompras === 5) {
      cart.forEach((producto) => {
        producto.price *= 0.6; // Aplicar descuento del 40%
      });
    }

    // Crear un array de items para la preferencia de pago
    const items = cart.map((producto) => ({
      title: `${producto.name} - ${producto.color}`,
      quantity: producto.quantity,
      currency_id: 'MXN',
      unit_price: producto.price,
    }));


    const preference = {
      items: items,

      back_urls: {
        success: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
        pending: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
        failure: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
      },
      notification_url: `${NOTIFICATION_MERCADOPAGO_BACK}/pagos/webhook?preferenceId=${preferenceId}`,
    };

    // Crear la preferencia en MercadoPago
    const response = await mercadopago.preferences.create(preference);
    // Guardar la orden en la base de datos
    const orden = await Orden.create({
      preferenceId,
      senderName,
      receiverName,
      deliveryType,
      address,
      cellphone,
      pickupTime,
      cart,
      userId: userId,
      username: username,
      description,
      // Otros campos de la orden
    });

    // Redirigir al usuario al checkout de MercadoPago
    res.send({ response });
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).send('Error al procesar el pago');
  }
};

const postSuscripcion = async (req, res) => {
  mercadopago.configure({
    access_token: tokenmp,
    sandbox: false,
  });
  const { userId, userEmail, userName, subscriptionType } = req.body;
  var susItem = {};
  var susRecurring = {};
  if (subscriptionType === 'mensual') {
    susItem =
    {
      title: 'Suscripción Mensual - Todo Flofral',
      quantity: 1,
      currency_id: 'MXN', // Cambiar a tu moneda local si es necesario
      unit_price: 399, // Cambiar al precio real de tu plan de suscripción
    }
    susRecurring = {
      frequency: 1, // Mensualmente
      frequency_type: 'months',
    }
  }

  if (subscriptionType === 'anual') {
    susItem =
    {
      title: 'Suscripción Anual - Todo Flofral',
      quantity: 1,
      currency_id: 'MXN', // Cambiar a tu moneda local si es necesario
      unit_price: 3999, // Cambiar al precio real de tu plan de suscripción
    };
    susRecurring = {
      frequency: 1, // Mensualmente
      frequency_type: 'years',
    }
  }
  try {
    // Obtén los datos necesarios del cliente y el plan de suscripción
    const user = await User.findByPk(userId);

    // Crea un objeto de preferencia de MercadoPago para el pago
    const preference = {
      items: [susItem],
      payer: {
        name: userName,
        email: userEmail,
      },
      back_urls: {
        success: `${NOTIFICATION_MERCADOPAGO_FRONT}/subcripciones`,
        pending: `${NOTIFICATION_MERCADOPAGO_FRONT}/subcripciones`,
        failure: `${NOTIFICATION_MERCADOPAGO_FRONT}/subcripciones`,
      },
      notification_url: `${NOTIFICATION_MERCADOPAGO_BACK}/pagos/subscripcion?userId=${userId}&subscriptionType=${subscriptionType}`,
      auto_recurring: susRecurring,
    };

    // Crea una preferencia de pago en MercadoPago
    const response = await mercadopago.preferences.create(preference);

    // Obtén la URL de pago generada
    const paymentUrl = response.body.init_point;

    // Redirige al cliente a la página de pago en MercadoPago
    res.send( response );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la suscripción' });
  }
};


const getSuscripcion = async (req, res) => {
  mercadopago.configure({
    access_token: tokenmp,
    sandbox: false,
  });
  try {
    const payment = req.query;
    if (payment.type === "payment") {
      const userId = payment.userId; // Obtén el ID del usuario logueado desde la solicitud
      const subscriptionType = payment.subscriptionType;
      const user = await User.findByPk(userId);


      if (!user) {
        res.status(404).send({ message: "Usuario no encontrado" });
        return;
      }

      //const data = await mercadopago.payment.findById(payment.id);
      const data = await mercadopago.payment.findById(payment['data.id'])
      //console.log(payment);
      console.log(data.body.id);
      console.log(data.body.status);

      if (data.body.status === 'approved') {
        // Actualiza los valores de suscripción
        user.suscrito = true;
        user.tipoDeSuscripcion = subscriptionType;
        user.fechaRenovacion = new Date();

        await user.save();
        res.send({ message: "Usuario suscrito exitosamente" });
      }
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al suscribir al usuario" });
  }
};

const getMercado = async (req, res) => {
  try {
    const payment = req.query

    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment['data.id'])
      const preferenceId = payment.preferenceId

      const orden = await Orden.findOne({ where: { preferenceId: preferenceId } });
      if (orden && data.body.status === 'approved') {
        orden.estado = 'PAGADO CON EXITO';
        orden.idCompra = payment['data.id'] // numero de id compra q nos da mercadopago

        await orden.save();

        const user = await User.findOne({ where: { id: orden.userId } }) //en mi orden traigo el id del usuario, y verifico cual es el total de sus compras

        if (user) {
          if (user.totalCompras < 5) { // si hay menos de 5 compras, le sumamos 1.
            user.totalCompras = user.totalCompras + 1
            user.save()
          } else {
            user.totalCompras = 0
            user.save()
          }
        }

      }

      client.messages
        .create({
          body: 'Tienes una nueva venta en tu tienda, checala!',
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+5216625130440'
        })
        .then(message => console.log(message.sid))
        .done();


    }
    res.send("webhook")
  } catch (error) {
    console.log(error)
  }
};

const getOrden = async (req, res) => {

  try {
    const preferenceId = req.query.preferenceId;
    const orden = await Orden.findOne({ where: { preferenceId: preferenceId } });

    if (!orden) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    return res.json(orden);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const getAllUserOrden = async (req, res) => {

  try {
    const userId = req.query.userId;
    const orden = await Orden.findAll({ where: { userId: userId } });

    if (!orden) {
      return res.status(404).json({ error: 'Sin Ordenes' });
    }

    return res.json(orden);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllOrden = async (req, res) => {
  try {
    const orden = await Orden.findAll({
      order: [['createdAt', 'DESC']]
    });

    if (!orden || orden.length === 0) {
      return res.status(404).json({ error: 'Sin Ordenes' });
    }

    return res.json(orden);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};




module.exports = {
  getMercado, postPagar, getOrden, getAllUserOrden, getAllOrden, postSuscripcion, getSuscripcion
};