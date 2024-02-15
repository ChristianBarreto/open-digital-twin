import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
 
export function SubSystemMenu({
  addEmptyBlock,
}) {
 
  return (
    <Navbar className="ml-auto max-w-md px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-left justify-between text-blue-gray-900">
        <div className="ml-auto flex items-center gap-x-1">
          <Button variant="text" size="sm" className="hidden lg:inline-block">
            <span>Configuration</span>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={() => addEmptyBlock()}
          >
            <span>Add block</span>
          </Button>
        </div>
      </div>
    </Navbar>
  );
}