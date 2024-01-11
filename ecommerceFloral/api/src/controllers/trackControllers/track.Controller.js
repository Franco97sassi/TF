const { Track } = require("../../db");
const { aws_upload_audio, aws_delete_audio } = require("../../utils/S3");

const getTrack = async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los registros de Track" });
  }
};

const postTrack = async (req, res) => {
  const file = req.file;
  const name = req.body.name;
  try {
    const trackUrl = await aws_upload_audio(file, name);
    await Track.create({ awsS3Url: trackUrl.url, fileName: name, s3file: trackUrl.uniqueFileName});
    return res.status(200).json({message: "Archivo subido con exito"});
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: "Ocurrio un error"});
  }
};

const deleteTrack = async (req, res) => {
    const { name, id } = req.body;
    try {
      const response = await aws_delete_audio(name);
      if (response.status === 200) {
        // Usando Sequelize para eliminar el registro
        await Track.destroy({
            where: { id: id }
        });
        res.status(200).json({ message: 'Track eliminado con éxito' });
      } else {
        // Manejar situaciones donde el status no es 200
        res.status(response.status).json({ message: 'No se pudo eliminar el audio' });
      }
    } catch (error) {
      // Manejar errores en la operación de eliminación
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};



module.exports = {
  getTrack,
  postTrack,
  deleteTrack
};
