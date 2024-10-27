import React, { useState } from "react";
import TaskModal from "./TaskModal/TaskModal";

const TaskCellRenderer: React.FC<any> = (params) => {
  const { data } = params; // This is the row data for the current cell
  const [showTaskModal, setShowTaskModal] = useState(false);
  const handleShowTaskModal = () => {
    setShowTaskModal(true);
  };

  return (
    <>
      <TaskModal isOpen={showTaskModal} data={data} />
      <button
        className="px-2 rounded-xl bg-[#2596be]"
        onClick={handleShowTaskModal}
      >
        View Task Details
      </button>
    </>
  );
};

export default TaskCellRenderer;
