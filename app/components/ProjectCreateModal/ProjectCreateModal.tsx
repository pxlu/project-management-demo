import React, { useEffect, useRef } from "react";
import "./ProjectCreateModal.css";
import Modal from "../Modal/Modal";
import ProjectCreate from "@/app/components/ui-components/ProjectCreateForm";

interface CreateProjectModalProps {
  isOpen: boolean;
  onSuccess: () => Promise<void>;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onSuccess,
}) => {
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen}>
      <ProjectCreate onSuccess={onSuccess} />
    </Modal>
  );
};

export default CreateProjectModal;
