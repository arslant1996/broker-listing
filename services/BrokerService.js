const BrokerHandler = require("../handler/BrokerHandler");
const { HelperUtils } = require("../helpers");

class BrokerService {
  static async getBrokerListing() {
    const { rows: datasets } = await BrokerHandler.getBrokerListing();

    const { rows: graphs } = await BrokerHandler.getBrokerForGraphs()

    const labels = HelperUtils.getLabels(graphs);

    return {
      datasets,
      graphs,
      labels
    }
  }
}

module.exports = BrokerService;
