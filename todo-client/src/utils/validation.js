export const validateFrom = (taskData) => {
  if (taskData.title.trim() === "") {
    alert("Tilte is required.");
    return false;
  }
  if (taskData.title.length > 50) {
    alert("Title must not exceed 50 characters.");
    return false;
  }
  if (taskData.description.length > 200) {
    alert("Description must not exceed 200 characters.");
    return false;
  }

  return true;
};
