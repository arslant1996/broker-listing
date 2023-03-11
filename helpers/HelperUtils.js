const { getMonthOfDate } = require("./date");

class HelperUtils {
  static getLabels(datasets) {
    return [...new Set(datasets.map((data) => (getMonthOfDate(data.month))))]
  }
}

module.exports = HelperUtils;