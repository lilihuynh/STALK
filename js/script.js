//Navbar drop down
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
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

var symbols =[];
$("#search-button").on("click", function (event) {
    event.preventDefault();
    
    //grab text from input box
    var symbol = $("#symbol").val().trim();

    //add new symbol input to symbol array
    symbols.push(symbol);

    // //save symbols array
    localStorage.setItem("symbols", JSON.stringify(symbols));
   // renderButtons();

    // construct URL
    var queryURL = "https://cloud.iexapis.com/stable/stock/market/batch?symbols=" + symbol + "&types=quote,news,chart&range=1m&last=5&token=pk_30e15d6843684560a19b08ebd5eee4b0";

    //Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

       
        $("#name").text(response.quote.symbol);
        $("#symbol").text(response.quote.companyName);
        $("#quote").text(response.quote.latestPrice);
        $("#change").text(response.quote.change);
        $("#change-percentage").text(response.quote.changePercent);
        $("#bid").text(response.quote.latestTime);
        $("#ask").text(response.quote.latestTime);
        $("#time").text(response.quote.latestTime);
        $("#volume").text(response.quote.latestVolume);
        $("#open").text(response.quote.open);
        $("#close").text(response.quote.close);
        $("#previousClose").text(response.quote.previousClose);
        $("#high").text(response.quote.high);
        $("#low").text(response.quote.low);


        
    });

   
});

var retrievedSymbols = JSON.parse(localStorage.getItem("symbols"));
console.log(retrievedSymbols);

//Ajax call
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/AAPL",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
		"x-rapidapi-key": "bc9acd37a3msh43f7fda48e7a6e5p1731cfjsn1e81e356eda8"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);

  $("#newsContainer").text(response.item[0]);


});
