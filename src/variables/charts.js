export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

// ##############################
// // // general variables for charts
// #############################

const chartColor = "#FFFFFF";

export const labels = [
  "SIJEČANJ",
  "VELJAČA",
  "OŽUJAK",
  "TRAVANJ",
  "SVIBANJ",
  "LUIPANJ",
  "SRPANJ",
  "KOLOVOZ",
  "RUJAN",
  "LISTOPAD",
  "STUDENI",
  "PROSINAC",
]

// General configuration for the charts with Line gradientStroke
export const gradientChartOptionsConfiguration = {
  maintainAspectRatio: false,
  parsing: {
    xAxisKey: 'month',
    yAxisKey: 'value'
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltips: {
      bodySpacing: 4,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
  },
  responsive: 1,
  scales: {
    y: {
      grid: {
        zeroLineColor: "#000",
        drawBorder: false,
      },
      ticks: {
        maxTicksLimit: 7,
        precision:0,
      },
    },
    x: {
      display: 0,
      ticks: {
        display: false,
      },
      grid: {
        zeroLineColor: "transparent",
        drawTicks: false,
        display: false,
        drawBorder: false,
      },
    },
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

var gradientChartOptionsConfigurationWithNumbersAndGrid = {
  parsing: {
    xAxisKey: 'month',
    yAxisKey: 'price'
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltips: {
      bodySpacing: 4,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
  },
  responsive: 1,
  scales: {
    y: {
      grid: {
        zeroLineColor: "#000",
        drawBorder: false,
      },
      ticks: {
        maxTicksLimit: 7,
      },
    },
    x: {
      display: 0,
      ticks: {
        display: false,
      },
      grid: {
        zeroLineColor: "#000",
        drawTicks: false,
        display: false,
        drawBorder: false,
      },
    },
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

// ##############################
// // // Dashboard view - Panel chart
// #############################


export const dashboardPanelChart1 = (data) => {

  var list = data.map((item) => {
    const date = new Date(item.createdAt);
    const monthName = date.toLocaleString('hr', {month: 'long'})

    return {
      price: item.finalPrice, 
      month: monthName.toUpperCase()
    }
  })

  var finalList = [];
  var holder = {};

  list.forEach(function(item) {
    if (holder.hasOwnProperty(item.month)) {
      holder[item.month] = holder[item.month] + item.price;
    } else {
      holder[item.month] = item.price;
    }
  });

  for (var prop in holder) {
    finalList.push({ month: prop, price: holder[prop] });
  }

  return {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "#000");

      return {
        labels: labels,
        datasets: [
          {
            label: "Izlazni računi",
            pointBackgroundColor: "#000",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 2,
            tension: 0.4,
            data: finalList,
          },
        ],
        
      };
    },
    options: {
      parsing: {
          xAxisKey: 'month',
          yAxisKey: 'price'
      },
      plugins: {
        legend: {
          display: true,
        },
        subtitle: {
          display: true,
          text: "Marko",
        },
        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#ff0d0d",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10,
          },
          grid: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
          },
        },
        x: {
          grid: {
            display: false,
            color: "rgba(255,255,255,0.1)",
          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
          },
        },
      },
  }
  };
};

export const dashboardPanelChart = (data) => {

  let list = data.map((item) => {
    return {price: item.finalPrice, month: new Date(item.createdAt).getMonth().toString()}
  })

  return {
    data: (canvas) => {
      const ctx = canvas.getContext("2d");
      var chartColor = "#FFFFFF";
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");

      return {
        labels: labels,
        datasets: list
      };
    },
    options: {
      
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10,
          },
          grid: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
          },
        },
        x: {
          grid: {
            display: false,
            color: "rgba(255,255,255,0.1)",
          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
          },
        },
      },
    },
  };
};

// ##############################
// // // Dashboard view - Shipped Products - Card
// #############################

export const dashboardShippedProductsChart = (data) => {

  var monthsOfCustomers = data.map((item) => {
    const date = new Date(item.createdAt);
    const monthName = date.toLocaleString('hr', {month: 'long'})

    return monthName.toUpperCase()
  })

  const counts = {};
  const customersByMonth = [];

  monthsOfCustomers.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;

    var index = customersByMonth.findIndex(item => item.month === x);

    index === -1 ? customersByMonth.push({month: x, value: counts[x]}) : customersByMonth[index].value = counts[x]
    
  });
  return {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
      return {
        labels: labels,
        datasets: [
          {
            label: "Kupci",
            borderColor: "#f96332",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#f96332",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            tension: 0.4,
            data: customersByMonth,
          },
        ],
      };
    },
    options: gradientChartOptionsConfiguration,
  }
};

// ##############################
// // // Dashboard view - All Products - Card
// #############################

export const dashboardAllProductsChart = (data) => {
  
  let list = data.map((item) => {

    const date = new Date(item.invoiceDate);
    const monthName = date.toLocaleString('hr', {month: 'long'})

    return {
      price: item.price, 
      month: monthName.toUpperCase()
    }
  })

  var finalList = [];
  var holder = {};

  list.forEach(function(item) {
    if (holder.hasOwnProperty(item.month)) {
      holder[item.month] = holder[item.month] + item.price;
    } else {
      holder[item.month] = item.price;
    }
  });

  for (var prop in holder) {
    finalList.push({ month: prop, price: holder[prop] });
  }

  return {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#18ce0f");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
      return {
        labels: labels,
        datasets: [
          {
            label: "Ulazni računi",
            borderColor: "#18ce0f",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#18ce0f",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            tension: 0.4,
            data: finalList,
          },
        ],
      };
    },
    options: gradientChartOptionsConfigurationWithNumbersAndGrid,
  }
};

// ##############################
// // // Dashboard view - Bar Chart - Card
// #############################

export const dashboard24HoursPerformanceChart = (data) => {


  console.log(data)

  return {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#2CA8FF", 0.6));
      return {
        labels: labels,
        datasets: [
          {
            label: "Active Countries",
            backgroundColor: gradientFill,
            borderColor: "#2CA8FF",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#2CA8FF",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 1,
            data: data,
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10,
        },
      },
      responsive: 1,
      scales: {
        y: {
          ticks: {
            maxTicksLimit: 7,
          },
          grid: {
            zeroLineColor: "transparent",
            drawBorder: false,
          },
        },
        x: {
          display: 0,
          ticks: {
            display: false,
          },
          grid: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 },
      },
    },
  };
};

// module.exports = {
//   hexToRGB,
//   dashboardPanelChart, // Chart for Dashboard view - Will be rendered in panel
//   dashboardShippedProductsChart, // Chart for Dashboard view - Shipped Products Card
//   dashboardAllProductsChart, // Chart for Dashboard view - All products Card
//   dashboard24HoursPerformanceChart, // Chart for Dashboard view - 24 Hours Performance Card
// };
