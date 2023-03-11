const moment = require("moment");

const getMonthOfDate = (date) => {
  if (!date) {
    return moment().format('MMMM')
  }

  return moment(date).format('MMMM')
}

const getFormattedDate = (date) => {
  return moment(date).format('DD-MM-YYYY')
}

module.exports = {
  getMonthOfDate,
  getFormattedDate
}