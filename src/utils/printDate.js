const printDate = dateVal => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(dateVal);

  return `${days[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

export default printDate;
