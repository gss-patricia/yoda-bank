import React, { ReactNode, RefObject, useRef, MouseEvent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type RenderChildrenType = {
  isOpen: boolean;
  toggle: () => void;
  triggerRef?: React.RefObject<any>;
};

interface IAlertDialog {
  title: string;
  content: string;
  titleId: string;
  contentId: string;
  ButtonTextFirst: string;
  ButtonTextSecond?: string;
  handleAgree: any;
  children: (childrenProps: RenderChildrenType) => ReactNode;
}

const AlertDialog = ({
  title,
  content,
  titleId,
  contentId,
  ButtonTextFirst,
  ButtonTextSecond,
  handleAgree,
  children,
}: IAlertDialog) => {
  const [open, setOpen] = React.useState(false);
  const isOpen: boolean = open;
  const triggerRef: RefObject<any> = useRef();

  const handleClose = (event: MouseEvent, param: string) => {
    setOpen(false);
    handleAgree(param);
  };

  return (
    <>
      {children({
        isOpen,
        toggle: () => {
          setOpen(!open);
        },
        triggerRef,
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id={titleId}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={contentId}>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event: MouseEvent) => {
              handleClose(event, ButtonTextFirst);
            }}
            color="primary"
          >
            {ButtonTextFirst}
          </Button>
          <Button
            onClick={(event: MouseEvent) => {
              handleClose(event, ButtonTextSecond!);
            }}
            color="primary"
            autoFocus
          >
            {ButtonTextSecond}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
