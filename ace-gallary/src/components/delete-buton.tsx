"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-red-100 text-red-600 shadow hover:bg-red-200"
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default DeleteButton;
