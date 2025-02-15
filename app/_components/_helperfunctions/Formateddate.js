const FormattedDate = (date) => {
  const now = new Date(date);
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return ` ${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
};

export default FormattedDate;
