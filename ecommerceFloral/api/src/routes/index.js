const { Router } = require("express");
const userRoute = require('./users/user.js')
const productRoute = require('./users/product.js')
const mercadoPago = require('./users/mercadopago.js')
const trackRoute = require('./users/track.js')



// Importar todos los routers;

const router = Router();

// Configurar los routers


router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/pagos', mercadoPago)
router.use('/track', trackRoute)



module.exports = router;