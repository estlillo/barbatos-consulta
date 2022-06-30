import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ButtonCancel from "./ButtonCancel";

import ViewerPDF from "./pdfViewer/ViewerPDF";

export default function DialogViewPDF(props) {
  const { onClose, open, url, nombreArchivo } = props;

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <strong>Visualización del archivo:</strong> {nombreArchivo}
        </DialogTitle>
        <DialogContent dividers>
          <ViewerPDF url={url} />
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={onClose} label="Cerrar" />
        </DialogActions>
      </Dialog>
    </>
  );
}
