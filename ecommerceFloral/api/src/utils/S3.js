const AWS = require("aws-sdk");
require("dotenv").config({ path: "./.env" });

const {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_REGION,
  AWS_AUDIO_BUCKET,
  AWS_BUCKET_NAME,
} = process.env;

AWS.config.update({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
  region: AWS_BUCKET_REGION,
});

const s3 = new AWS.S3({ params: { Bucket: AWS_BUCKET_NAME } });

const aws_upload_audio = (file, name) => {
    return new Promise((resolve, reject) => {
        // Generar un nombre de archivo único
        const currentTime = new Date().getTime();
        const uniqueFileName = `${currentTime}_${name}`;

        // Preparar los datos para subir a S3
        const data = {
            Bucket: AWS_BUCKET_NAME ,
            Key: uniqueFileName,
            Body: file.buffer, // Usar buffer del archivo directamente
            ContentType: file.mimetype // Usar el tipo MIME del archivo
        };

        // Subir el archivo a S3
        s3.upload(data, (err, data) => {
            if (err) {
                console.log(`Error al subir el archivo: ${err}`);
                reject(err);
            } else {
                const url = data.Location; // La URL del archivo en S3
                resolve({ url, uniqueFileName });
            }
        });
    });
};

const aws_delete_audio = (name) => {
    return new Promise((resolve, reject) => {
        // Nombre del archivo a eliminar
        const fileName = name;

        // Preparar los datos para eliminar de S3
        const data = {
            Bucket: AWS_BUCKET_NAME,
            Key: fileName
        };

        // Eliminar el archivo de S3
        s3.deleteObject(data, (err, data) => {
            if (err) {
                console.log(`Eror al eliminar el archivo: ${err}`);
                reject({message: err, status: 400});
            } else {
                resolve({ message: 'Archivo borrado exitosamente', status: 200 });
            }
        });
    });
};


module.exports = {
  aws_upload_audio,
  aws_delete_audio
};
