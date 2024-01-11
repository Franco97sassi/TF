const { Router } = require("express");
const router = Router();
const { getMercado, postPagar, getOrden, getAllUserOrden, getAllOrden, postSuscripcion, getSuscripcion } = require("../../controllers/mercadoControllers/mercadoControllers")

router.post("/webhook", getMercado)
router.post("/subscripcion", getSuscripcion)

router.post("/pagar", postPagar)
router.post("/subscribe", postSuscripcion)

router.get("/orden", getOrden)
router.get("/ordenuser", getAllUserOrden)
router.get("/ordentodas", getAllOrden)


module.exports = router;