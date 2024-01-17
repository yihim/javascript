export const toDate = (date) => {
  let current = new Date();
  let day = current.getDate();
  let currentMonth = date.split("-")[1];
  let currentDay = date.split("-").pop();
  if (day.toString() == currentDay) {
    currentDay = "Today";
    currentMonth = "";
  } else {
    currentMonth = currentMonth + "-";
  }

  const newFormat = currentMonth + currentDay + "\t";
  return newFormat;
};

export const to12Format = (time) => {
  let h = parseInt(time.split(":").shift());
  let m = time.split(":").pop();
  if (h > 12) {
    h = h - 12;
    m = m + " PM";
  } else if (h == 12) {
    m = m + " PM";
  } else if (h == 0) {
    h = 12;
    m = m + " AM";
  } else {
    m = m + " AM";
  }
  const newFormat = h.toString() + ":" + m + "\t\t";
  return newFormat;
};
