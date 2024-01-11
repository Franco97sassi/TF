import styled from "@emotion/styled";
import {
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../theme";

export const FooterTitle = styled(Typography)(() => ({
  textTransform: "uppercase",
  marginBottom: "0.2em",
}));

export const SubscribeTf = styled(Input)(() => ({
  ".MuiInputLabel-root": {
    color: "#fff",
  },

  ".MuiInput-root::before": {
    borderBottom: `1px solid #fff!important`,
  },
  ".MuiInput-root::after": {
    borderBottom: `1px solid ${Colors.secondary}`,
  },
}));
