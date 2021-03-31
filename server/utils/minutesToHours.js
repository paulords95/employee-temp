const convertMinutesToHours = (min) => {
  const hours = Math.floor(min / 60);
  let minutes = min % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

module.exports = convertMinutesToHours;
