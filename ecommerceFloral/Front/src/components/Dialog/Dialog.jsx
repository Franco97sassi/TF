import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

export const ConfirmationDialog = ({
  open,
  handleClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
