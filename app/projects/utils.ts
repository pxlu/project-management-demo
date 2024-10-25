export const convertStatusText = (statusText: string | null): string => {
  let output: string;
  switch (statusText) {
    case "in_progress":
      output = "In Progress";
      break;
    case "completed":
      output = "Completed";
      break;
    case "on_hold":
      output = "On Hold";
      break;
    default:
      output = "Cannot be found";
  }
  return output;
};
