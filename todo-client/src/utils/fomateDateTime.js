export const formateDateTime = (isoString) => {
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { formattedDate, formattedTime };
};
