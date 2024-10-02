export default (day) => {
  switch (day) {
    case 'Do':
    case '1':
      return 'D';
    case '2':
    case '2ª':
      return 'S';
    case '3':
    case '3ª':
      return 'T';
    case '4':
    case '4ª':
      return 'Q';
    case '5':
    case '5ª':
      return 'Q';
    case '6':
    case '6ª':
    case 'Sá':
      return 'S';
    default:
      return day;
  }
};
