
var symbols =[];
$("#search-button").on("click", function (event) {
    event.preventDefault();
    
    //grab text from input box
    var symbol = $("#").val().trim();

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
