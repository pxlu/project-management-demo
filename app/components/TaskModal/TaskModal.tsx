import React, { useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import { convertStatusText } from "@/app/projects/utils";

interface TaskModalProps {
  isOpen: boolean;
  data: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
  };
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, data }) => {
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
      <div className="h-[75vh] w-[75vw] text-black">
        <div className="p-8 text-4xl font-semibold">{data.title}</div>
        <div className="pl-8">
          <div className="text-xl pb-2">{data.description}</div>
          <div className="text-lg">
            <span className="font-bold">Priority: </span>{" "}
            {data.priority
              ? data.priority[0].toUpperCase() + data.priority.slice(1)
              : "N/A"}
          </div>
          <div className="text-lg">
            <span className="font-bold">Status:</span>{" "}
            {convertStatusText(data.status)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
