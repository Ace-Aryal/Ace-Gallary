"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Dialog, DialogHeader, DialogOverlay } from "./dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogHeader>
        <DialogTitle>Modal for the clicked image</DialogTitle>
      </DialogHeader>
      <DialogOverlay className="flex h-full items-center justify-center overflow-y-hidden">
        <DialogContent className="rounded bg-gray-100 p-2">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default Modal;
