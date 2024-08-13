import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function EditBlockModal({
  open,
  setOpen,
  system,
  rerenderSystem,
  block
}: {
  open: boolean,
  setOpen: (b: boolean) => void
}) {
 
  const handleOpen = () => setOpen(!open);

  console.log(block)

  const handleChangeBlockType = () => {
    system.changeBlockTypeToSin(block.id);
    rerenderSystem();
  }
 
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Edit block</DialogHeader>
        <DialogBody>
          Change block type.
          <Button variant="gradient" color="green" onClick={handleChangeBlockType}>
            <span>Confirm</span>
          </Button>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}