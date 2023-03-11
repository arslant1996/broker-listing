const { DBHandler } = require("../database");

class BrokerHandler {
  static async getBrokerForGraphs() {
    return DBHandler.client.query(
      `SELECT 
      sites.title AS broker_name, 
      DATE_TRUNC('month', deals.date) AS month, 
      COUNT(*) AS new_listings_count, 
      AVG(deals_history.revenue) AS avg_revenue_per_listing
    FROM 
      sites
      right JOIN deals ON sites.id = deals.site_id 
      left JOIN deals_history ON deals.id = deals_history.deal_id 
    Where
      deals.date >= '2020-11-01' AND deals.date <= '2022-12-31'
      AND deals.removed = false
    GROUP BY 
      broker_name, month
    ORDER BY 
      month;`
    );
  }

  static async getBrokerListing() {
    return DBHandler.client.query(
      `
    SELECT 
      sites.title AS broker_name, 
      deals.* as listing,
      DATE_TRUNC('month', deals.date) AS month, 
      AVG(deals_history.revenue) AS avg_revenue_per_listing
    FROM 
      sites
      right JOIN deals ON sites.id = deals.site_id 
      left JOIN deals_history ON deals.id = deals_history.deal_id 
    Where
      deals.date >= '2020-11-01' AND deals.date <= '2021-12-31'
      AND deals.removed = false
    GROUP BY 
      broker_name, deals.id
    Order By
      month
    `
    )
  }
}

module.exports = BrokerHandler;
