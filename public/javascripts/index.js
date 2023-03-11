const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
];

function color(index) {
  return COLORS[index % COLORS.length];
}

createChartForListings("new_listings_count", "chartPerNewListing");
createChartForListings("avg_revenue_per_listing", "chartPerRevenue");

function createChartForListings(listingType, chartName) {
  const revenueData = graphContent.reduce((acc, curr) => {
    if (!acc[curr.broker_name]) {
      acc[curr.broker_name] = {
        broker_name: curr.broker_name,
        data: [],
      };
    }
    acc[curr.broker_name].data.push(curr[listingType]);
    return acc;
  }, {});

  const data = {
    labels: graphLabels,
    datasets: Object.keys(revenueData).map((broker, index) => ({
      label: broker,
      data: revenueData[broker].data,
      borderColor: color(index),
      fill: false,
    })),
  };

  const options = {
    title: {
      display: true,
      text: "Listings per Website",
    },
    scales: {
      x: 
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      y: 
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Listings",
          },
        }
    },
  };

  const ctx = document.getElementById(chartName).getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

const fieldEl = document.getElementById("filter-field");
let typeEl = document.getElementById("filter-type");
let valueEl = document.getElementById("filter-value");

function updateFilter() {
  const filterVal = fieldEl.options[fieldEl.selectedIndex].value;
  const typeVal = typeEl.options[typeEl.selectedIndex].value;


  typeEl.disabled = false;
  valueEl.disabled = false;

  if (filterVal) {
    table.setFilter(filterVal, typeVal, valueEl.value);
  }
}

document
  .getElementById("filter-field")
  .addEventListener("change", updateFilter);
document.getElementById("filter-type").addEventListener("change", updateFilter);
document.getElementById("filter-value").addEventListener("keyup", updateFilter);

document.getElementById("filter-clear").addEventListener("click", function () {
  fieldEl.value = "";
  typeEl.value = "like";
  valueEl.value = "";

  table.clearFilter();
});

Tabulator.extendModule("format", "formatters", {
  month: (cell, formatterParams) => {
    const date = new Date(cell.getValue());
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  },
  date: (cell) => {
    return new Date(cell.getValue()).toISOString().slice(0, 10);
  },
  revenue: (cell) => {
    return Number(cell.getValue()).toFixed(2)
  }
});

const table = new Tabulator("#table", {
  data: datasets,
  layout: "fitColumns",
  responsiveLayout: "hide",
  addRowPos: "top",
  history: true,
  pagination: "local",
  paginationSize: 10,
  paginationCounter: "rows",
  initialSort: [
    { column: "id", dir: "asc" },
  ],
  columns: [
    { title: "Listing ID", field: "id" },
    { title: "Listing Month", field: "month", formatter: "month" },
    { title: "Listing Date", field: "date", sorter: "date", formatter: "date" },
    { title: "Broker", field: "broker_name" },
    { title: "Revenue", field: "avg_revenue_per_listing", formatter: 'revenue' },
  ],
});
