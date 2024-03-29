import { Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { MessageText, PromotionsContainer } from "../../styles/promotions";
import { Colors } from "../../styles/theme";

const messages = [
  "¿Preguntas?... Llamanos yá al 6625130440",
  "Puedes cotizar tu evento en nuestra web",
  "Cotiza y agenda tu evento desde aquí",
  "Obtén nuestra tarjeta de fidelildad y gánate un 40% de descuento en tu quinta compra",
  "Envíos a domicilio disponibles todos los días"
];
export default function Promotions() {
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
    const intervalId = setInterval(() => {
      // get next message
      setMessageIndex((i) => (i + 1) % messages.length);

      // slide the message in
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <PromotionsContainer ref={containerRef} overflow="hidden">
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        container={containerRef.current}
        timeout={{
          enter: 500,
          exit: 100,
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" paddingInline={"16px"} textAlign={"center"}>
          <MessageText >
            {messages[messageIndex]}
          </MessageText>
        </Box>
      </Slide>
    </PromotionsContainer>
  );
}
