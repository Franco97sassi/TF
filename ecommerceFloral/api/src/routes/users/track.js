const { Router } = require("express");
const router = Router();
const trackCotrollers = require('../../controllers/trackControllers/track.Controller')
const isUserLoggedInAdmin = require("../../middlewares/authAdmin")
const multer = require('multer');






const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/postTrack",upload.single('file'),trackCotrollers.postTrack)
router.get("/getTrack", trackCotrollers.getTrack)
router.delete("/deleteTrack", trackCotrollers.deleteTrack)

module.exports = router;

