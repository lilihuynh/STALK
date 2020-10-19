//Navbar drop down
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

var symbols = [];
$(".search-button").on("click", function (event) {
  event.preventDefault();
console.log("button clicked");
  //grab text from input box
  var symbol = $("#symbol").val().trim();

  var isAdded = false;
  for (var i = 0; i < symbols.length; i++) {
    if (symbols[i].toLowerCase() === symbol.toLowerCase()) {
      console.log("symbol added");
      isAdded = true;

    }
  }

  if (isAdded === false) {
    //add new symbol input to symbol array
    symbols.push(symbol);

    // //save symbols array
    localStorage.setItem("symbols", JSON.stringify(symbols));
    renderButtons();
  }

  // construct URL
  var queryURL = "https://cloud.iexapis.com/stable/stock/" + symbol + "/batch?types=quote,news,chart&range=1m&last=5&token=pk_30e15d6843684560a19b08ebd5eee4b0";

  //Ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    console.log(response.quote.companyName)
    pastingStock(response);
    makeTheChart(response);

  });


});

// var retrievedSymbols = JSON.parse(localStorage.getItem("symbols"));
// console.log(retrievedSymbols);



function renderButtons() {
  // Deleting the city buttons prior to adding new movie buttons
  // if not, we will have repeat buttons)
  $("#symbol-button").empty();
  for (var i = 0; i < symbols.length; i++) {
    //create button element for retrievedCities
    var symbolButton = $("<button>");
    //add class city (script for later click event) to each button
    symbolButton.addClass("symbolClick");
    // //add class button (css) to each button
    // symbolButton.addClass("button");
    //add data-name attribute to each city button
    symbolButton.attr("data-name", symbols[i]);
    //add text which is the city name from cities array to each city button
    symbolButton.text(symbols[i]);
    //append button to HTML
    $("#symbol-button").append(symbolButton);
  };

};

// if (retrievedSymbols) {
//   symbols = retrievedSymbols;
//   renderButtons();
// };

//add click event to all elements with class "symbolClick"
//when symbol button is click run displayCityWeather function to show that city's weather info
$(document).on("click", ".symbolClick", displayStock);

function displayStock() {
  var symbol = $(this).attr("data-name");
  var queryURL = "https://cloud.iexapis.com/stable/stock/" + symbol + "/batch?types=quote,news,chart&range=1m&last=5&token=pk_30e15d6843684560a19b08ebd5eee4b0";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.quote.symbol)
    pastingStock(response);

  });
}

function pastingStock(response) {
  //stock info
  console.log("pasting STOCK",response);
  $("#stockInfo").empty();
  $("#stockInfo").append("<h3><b>" + response.quote.companyName + "</b></h3>");
  $("#stockInfo").append("<h4>" + response.quote.symbol + "</h4>");
  $("#stockInfo").append("<h4>" + response.quote.latestTime + "</h4>");
  $("#stockInfo").append("<h6><b>Price: </b>" + response.quote.latestPrice + "$</h6>");
  $("#stockInfo").append("<h6><b>Change: </b>" + response.quote.change + "$</h6>");
  $("#stockInfo").append("<h6><b>ercentage change: </b>" + response.quote.changePercent + "</h6>");
  $("#stockInfo").append("<h6><b>Bid: </b>" + response.quote.iexBidPrice + "$</h6>");
  $("#stockInfo").append("<h6><b>Ask: </b>" + response.quote.iexAskPrice + "$</h6>");
  $("#stockInfo").append("<h6><b>Open Price: </b>" + response.quote.open + "$</h6>");
  $("#stockInfo").append("<h6><b>Close Price: </b>" + response.quote.close + "$</h6>");
  $("#stockInfo").append("<h6><b>Previous Close Price: </b>" + response.quote.previousClose + "$</h6>");
  $("#stockInfo").append("<h6><b>High: </b>" + response.quote.high + "$</h6>");
  $("#stockInfo").append("<h6><b>Low: </b>" + response.quote.low + "$</h6>");
  $("#stockInfo").append("<h6><b>Volume: </b>" + response.quote.latestVolume + "</h6>");
  //news
  $("#symbolNews").empty(); //prevent searched news repeated
  for (var i = 0; i < response.news.length; i++) {
    var symbolNews = $("<div>");
    symbolNews.addClass("savedBtn");
    symbolNews.attr("id", "symbolArticle-" + i); //creat id for each article
    $("#symbolNews").append(symbolNews);

    //attach article news accordinglly to the created divs with unique id for each div
    $("#symbolArticle-" + i).append("<h4 class='headline'>" + response.news[i].headline + "</h4>");
    $("#symbolArticle-" + i).append("<h5 class='news'><b>Summary: </b>" + response.news[i].summary + "</h5>");
    $("#symbolArticle-" + i).append("<h5 class='news'><b>Source: </b>" + response.news[i].source + "</h5>");
    $("#symbolArticle-" + i).append("<a href=" + response.news[i].url + "><b>Link: </b>" + response.news[i].url + "</a>");

  }
}

// Ajax call
// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/AAPL",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
//         "x-rapidapi-key": "bc9acd37a3msh43f7fda48e7a6e5p1731cfjsn1e81e356eda8"
//     }
// }

// $.ajax(settings).done(function (response) {
//     console.log(response);

//     //$("#newsContainer").text(response.item[0]);


// });

// "https://cloud.iexapis.com/stable/stock/" + BA + "/batch?types=quote,news,chart&range=1m&last=5&token=pk_30e15d6843684560a19b08ebd5eee4b0"
// var data = [];
// for (var i = 0; i < response.chart.length; i++){
// response.chart[i].date; //x
// response.chart[i].close; //y
// var xChart = response.chart[i].date;
// data.push(xChart);
// }

function makeTheChart(response) {
  console.log(response);
  var points = [];
var labels = [];
var values =[];
  for (var i = 0; i < 16; i++) {
    // response.chart[i].date; //x
    // response.chart[i].close; //y
    var point = {};
    var xChart = response.chart[i].date;
  point.x = xChart;
    labels.push(xChart);
   point.y = response.chart[i].close;
    points.push(point);
    values.push(point.y);
  }
console.log(labels);
  var chart = $("#myChart")[0].getContext('2d');
  var myChart = new Chart(chart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stock Value Over Time',
       
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

