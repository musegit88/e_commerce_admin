"use client";

import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {
    setIsStarted(true);
  }, []);
  if (!isStarted) {
    return null;
  }
  return (
    <Modal
      title="Are you sure? you want to delete?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={loading} onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
