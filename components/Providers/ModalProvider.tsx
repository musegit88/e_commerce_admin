"use client";

import React, { useEffect, useState } from "react";

import StoreModal from "../modals/StoreModal";

const ModalProvider = () => {
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {
    setIsStarted(true);
  }, []);
  if (!isStarted) {
    return null;
  }
  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
