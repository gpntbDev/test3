
let date = new Date();


function monthReplacer(month) {
  switch (month) {
    case 0:
      month = 'января';
      break;
    case 1:
      month = 'февраля';
      break;
    case 2:
      month = 'марта';
      break;
    case 3:
      month = 'апреля';
      break;
    case 4:
      month = 'мая';
      break;
    case 5:
      month = 'июня';
      break;
    case 6:
      month = 'июля';
      break;
    case 7:
      month = 'августа';
      break;
    case 8:
      month = 'сентября';
      break;
    case 9:
      month = 'октября';
      break;
    case 10:
      month = 'ноября';
      break;
    case 11:
      month = 'декабря';

  }
  return month

}

module.exports = function dateOfReg() {

  return `${date.getDate()} ${monthReplacer(date.getMonth())} ${date.getFullYear()} года`;
}