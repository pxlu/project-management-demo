import React, { useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import { convertStatusText } from "@/app/projects/utils";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";

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

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, data }) => {
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteTask = async () => {
    if (
      confirm(
        "Are you sure you want to delete this task? This action cannot be undone"
      )
    ) {
      const deleted = await client.models.Task.delete({ id: data.id });
      if (deleted.errors) {
        alert(
          `Failed to delete: ${deleted.errors.map((e) => e.message).join("; ")}`
        );
      } else if (deleted.data) {
        alert(`Task ${deleted.data.title} deleted`);
        isOpen = false;
      }
    }
  };

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
        <div className="flex flex-row justify-between items-center py-4">
          <h1 className="text-6xl">{data.title}</h1>
          <button
            className="rounded-2xl bg-[#ff0000] h-10 px-4 float-right mr-10"
            onClick={handleDeleteTask}
          >
            <span className="font-sans font-semibold">Delete Task</span>
          </button>
        </div>
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
