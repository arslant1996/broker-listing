const { Validators } = require("../helpers");
const { ErrorCodes, Broker } = require("../constants");
const BrokerService = require("../services/BrokerService");

class BrokerController {
  static async getBrokerListing(req, res) {
    try {
      const { datasets, graphs, labels } = await BrokerService.getBrokerListing();

      return res.render('graph', {
        datasets: JSON.stringify(datasets),
        graphs: JSON.stringify(graphs),
        labels: JSON.stringify(labels)
       });
    } catch (err) {
      console.log(err);

      return res
        .status(
          Validators.validateCode(err.code, ErrorCodes.INTERNAL_SERVER_ERROR) ||
            ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .render('error', {
          success: false,
          message: err.reportError
            ? err.message
            : Broker.MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }
}

module.exports = BrokerController;
