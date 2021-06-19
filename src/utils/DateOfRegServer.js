let date = new Date();
let currentMonth = date.getMonth() > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
let currentDay = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();

module.exports = () => {
    return `${currentDay}.${currentMonth}.${date.getFullYear()}`;
}