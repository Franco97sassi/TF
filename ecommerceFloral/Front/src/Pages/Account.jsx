import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { Colors } from "../styles/theme";
import { useMediaQuery } from "@mui/material";
const apiUrl = import.meta.env.VITE_API_URL;
import { Calendar } from "../components/calendar/calendar";

const userData = localStorage.getItem("userData");
const token = userData ? JSON.parse(userData).user : null;
const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
const decodedToken = decoded?.user;

export const Account = ({ decodedToken }) => {
  const [orden, setOrden] = useState();
  const [userCompras, setUserCompras] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    // Aquí puedes establecer el valor del userId

    const fetchOrden = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/pagos/ordenuser?userId=${
            decodedToken?.id ? decodedToken.id : "-"
          }`
        );
        const data = await response.json();
        setOrden(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrden();
  }, []);

  useEffect(() => {
    // Aquí puedes establecer el valor del userId

    const fetchUserCompras = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/user/totalcompras?id=${
            decodedToken?.id ? decodedToken.id : "-"
          }`
        );
        const data = await response.json();
        setUserCompras(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCompras();
  }, [orden]);

  const handleDetalleClick = (id) => {
    window.location.href = `/success?preferenceId=${id}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("persist:root");
    window.location.href = "/";
  };

  const totalPurchases = userCompras ? userCompras : "0"; // Obtener el total de compras del usuario
  const discountProgress = `${totalPurchases}/5`; // Calcular el progreso del descuento

  const greenCircles = Math.min(totalPurchases, 5); // Cantidad de círculos verdes (máximo 5)
  const redCircles = 5 - greenCircles; // Cantidad de círculos rojos

  const circleElements = []; // Arreglo para almacenar los elementos de los círculos

  // Generar los círculos verdes
  for (let i = 0; i < greenCircles; i++) {
    circleElements.push(
      <div
        key={`circle-${i}`}
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "green",
          marginRight: "4px",
          border: "1px solid black",
        }}
      ></div>
    );
  }

  // Generar los círculos rojos
  for (let i = 0; i < redCircles; i++) {
    circleElements.push(
      <div
        key={`circle-${greenCircles + i}`}
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "white",
          marginRight: "4px",
          border: "1px solid black",
        }}
      ></div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Box
        sx={{
          background: Colors.light_gray,
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={isMobile ? "column" : "row"}
        >
          <Typography variant="h4" gutterBottom fontFamily={"TanPearl"} p={1}>
            Hola {decodedToken?.username ? decodedToken.username : "Usuario"}
          </Typography>
          <Box
            justifyContent={
              decodedToken.admin || isMobile ? "space-evenly" : "flex-end"
            }
            sx={{ display: "flex", p: 1, width: "500px" }}
          >
            {decodedToken.admin ? (
              <>
              <Button
                variant="contained"
                color="error"
                sx={{ color: "white", fontWeight: 600 }}
                href="/admin"
              >
                Panel Admin
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ color: "white", fontWeight: 600 }}
                href="/admin/audioQr"
              >
                Audio QR
              </Button>
              </>
              
            ) : (
              <></>
            )}

            <Button
              variant="contained"
              color="error"
              sx={{ color: "white", fontWeight: 600 }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>

        <Box marginBottom={2}>
          {decodedToken.admin ? (
            <Typography
              sx={{ marginTop: "28px", marginBottom: "28px" }}
              variant="h6"
              gutterBottom
            >
              Últimas ordenes realizadas
            </Typography>
          ) : (
            <></>
          )}
          <Grid container spacing={2}>
            {orden?.map((purchase) => (
              <Grid item key={purchase.id} xs={12} sm={6} md={4} lg={3}>
                <Box
                  border={1}
                  padding={2}
                  borderRadius={8}
                  style={{
                    borderColor: "#ccc",
                    background: "white",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontWeight: "bold" }}
                    gutterBottom
                  >
                    Fecha: {purchase.createdAt.slice(0, 10)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "black" }}
                    gutterBottom
                  >
                    Estado:{" "}
                    {purchase.estado === "PAGADO CON EXITO"
                      ? "PAGADO CON ÉXITO"
                      : "NO PAGADO"}
                  </Typography>

                  <Button
                    onClick={() => handleDetalleClick(purchase.preferenceId)}
                  >
                    {" "}
                    ver detalles
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box marginBottom={2}>
          {decodedToken.admin ? (
            <Typography variant="h6" gutterBottom>
              Cantidad de Compras: {totalPurchases}
            </Typography>
          ) : (
            <></>
          )}
        </Box>

        {decodedToken.admin ? (
          <> </>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              marginBottom={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to bottom, #667eea, #764ba2)",
                padding: "18px",
                maxWidth: "300px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                color: "white",
              }}
            >
              <Typography
                sx={{ textAlign: "center" }}
                variant="h6"
                gutterBottom
              >
                Tarjeta fidelidad
              </Typography>
              <Typography sx={{ textAlign: "center" }} gutterBottom>
                Obtendrás un 40% de descuento después de tu 5ta compra.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "white", fontWeight: "bold" }}
                gutterBottom
              >
                Llevas {discountProgress}
              </Typography>
              <div style={{ display: "flex", marginTop: "10px" }}>
                {circleElements}
              </div>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};
