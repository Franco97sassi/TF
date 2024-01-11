import {
  Button,
  TextField,
  Box,
  useMediaQuery,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ConfirmationDialog } from "../components/Dialog/Dialog";
const BACKEND = import.meta.env.VITE_API_URL;

const AUDIO_DATA = [
  { id: 1, name: "Audio 1", url: "http://ejemplo.com/audio1.mp3" },
  { id: 2, name: "Audio 2", url: "http://ejemplo.com/audio2.mp3" },
  { id: 3, name: "Audio 3", url: "http://ejemplo.com/audio3.mp3" },
];

export const AudioQR = () => {
  const [audios, setAudios] = useState();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState();
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentAudioURL, setCurrentAudioURL] = useState("");
  const [customName, setCustomName] = useState("");
  const [fileDelete, setFileDelete ] = useState()
  const isMobile = useMediaQuery("(max-width:1366px)");
  useEffect(() => {
    fetchTracks();
  }, []);

  useEffect(() => {
    if (currentAudioURL) {
      console.log(currentAudioURL);
      printQR();
    }
    return () => {
      setCurrentAudioURL();
    };
  }, [currentAudioURL]);

  const fetchTracks = () => {
    axios
      .get(`${BACKEND}/track/getTrack`)
      .then((response) => {
        setAudios(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los audios", error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 1200000) {
      setSelectedFile(file);
    } else {
      alert("El archivo debe ser de audio.");
    }
  };

  const handleNameChange = (event) => {
    setCustomName(event.target.value);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      alert("Por favor, seleccione un archivo primero");
      return;
    }
    const fileName = customName || selectedFile.name;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", fileName);

    const endpoint = `${BACKEND}/track/postTrack`;
    const axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(endpoint, formData, axiosConfig);
      if (response.status === 200) {
        setLoading(false);
        setCustomName()
        setSelectedFile(null);
        setResponseMessage(response);
        fetchTracks();
        setTimeout(() => {
          setResponseMessage();
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      setResponseMessage(error.response);
      setTimeout(() => {
        setResponseMessage();
      }, 1500);
      console.error("Error al subir el archivo:", error);
    }
  };

  const handleDeleteClick = (fileName) => {
    setDialogOpen(true);
    setFileDelete(fileName)
  };


  const handleConfirmDelete = async () => {
    setDialogOpen(false);
    try {
      const response = await axios.delete(`${BACKEND}/track/deleteTrack`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { name: fileDelete.s3file, id:fileDelete.id}
      });
  
      if (response.status === 200) {
        fetchTracks()
      }
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };


  const handleGenerateQR = (url) => {
    setCurrentAudioURL(url);
  };

  const printQR = () => {
    const newWindow = window.open("", "_blank");
    const qrImage = new Image();
    // Ajusta el tamaño del QR aquí, por ejemplo, a 300x300
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      currentAudioURL
    )}`;
    qrImage.onload = () => {
      newWindow.document.write(`
                <html>
                    <head>
                        <title>Imprimir QR</title>
                        <style>
                            @media print {
                                .no-print { display: none; }
                                img { width: 100%; max-width: 300px; height: auto; } // Ajusta el tamaño máximo aquí
                            }
                            .no-print {
                                margin-top: 2rem;
                                width: 12rem;
                                height: 2rem;
                            }
                        </style>
                    </head>
                    <body style="text-align: center;">
                        <img src="${qrImage.src}" alt="QR Code"/>
                        <br>
                        <button class="no-print" onclick="window.print();">Imprimir QR</button>
                    </body>
                </html>
            `);
      newWindow.document.close();
    };
  };

  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "play",
      headerName: "Reproducir",
      renderCell: (params) => (
        <button onClick={() => window.open(params.row.url, "_blank")}>
          Reproducir
        </button>
      ),
      flex: 0.5,
    },
    {
      field: "generateQR",
      headerName: "Generar QR",
      renderCell: (params) => (
        <button onClick={() => handleGenerateQR(params.row.url)}>
          Generar QR
        </button>
      ),
      flex: 0.5,
    },
    {
      field: "delete",
      headerName: "Eliminar",
      renderCell: (params) => (
        <button onClick={() =>  handleDeleteClick(params.row.s3file)}>Eliminar</button>
      ),
      flex: 0.5,
    },
  ];

  const rows = audios?.map((audio, index) => ({
    id: audio.id,
    name: audio.fileName,
    url: audio.awsS3Url,
    s3file: audio
  }));

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "2rem",
        flexWrap: "wrap",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>Subir Audio</h2>
        <input
          accept="audio/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            Seleccionar Archivo
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
            Archivo seleccionado: {selectedFile.name}
          </Typography>
        )}
        {selectedFile && (
          <Box mt={2}>
            <TextField
              sx={{ width: "25rem" }}
              variant="outlined"
              placeholder="Nombre para identificar el audio"
              onChange={handleNameChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              {!loading ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleUpload}
                  style={{ marginTop: "20px", fontWeight: "bold" }}
                >
                  Subir Audio
                </Button>
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Box>
        )}
        {responseMessage && (
          <Typography
            sx={{
              color: responseMessage.status === 200 ? "green" : "red",
              mt: "2rem",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {responseMessage.data.message}
          </Typography>
        )}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>Listado de audios</h2>
        {audios ? (
          <div style={{ height: isMobile ? "55vh" : "70vh", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        ) : (
          <>
            <h3>Obteniendo audios</h3>
            <CircularProgress />
          </>
        )}
      </div>
      <ConfirmationDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        message="¿Estás seguro de querer eliminar este archivo?"
        
      />
    </div>
  );
};
