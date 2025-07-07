export const getFormattedDate = (dueDate) => {
  const date = new Date(dueDate.split("T")[0]).toDateString();

  return date;
};
