import React, { useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import TaskCreateForm from "../ui-components/TaskCreateForm";

interface CreateTaskModalProps {
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
  onError: (e: any, m: any) => void;
  projectId: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  setModalOpen,
  onSuccess,
  onError,
  projectId,
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
    <Modal hasCloseBtn={true} setModalOpen={setModalOpen} isOpen={isOpen}>
      <div>Hello World</div>
      <TaskCreateForm
        onSuccess={onSuccess}
        onError={onError}
        projectId={projectId}
      />
    </Modal>
  );
};

export default CreateTaskModal;
