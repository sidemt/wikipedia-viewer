$(document).ready(function() {
  $("#searchForm").submit(function(){
    // Cancel the request by HTML
    event.preventDefault();

    // Get the string in textBox
    var keyword = $("#textBox").val();
    
    if (keyword != ""){
      //If textBox is not empty

      // Send Ajax request
      $.ajax({
        url: "//en.wikipedia.org/w/api.php",
        data: {
          action: "query",
          format: "json",
          prop: "extracts",
          list: "",
          generator: "search",
          exsentences: "1",
          exlimit: "10",
          exintro: 1,
          explaintext: 1,
          gsrsearch: keyword,
          gsrlimit: "10"
        },
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        // Success handler
        success: function (data){
          if (data.query){
            // if "query" exists in returned JSON
            var searchResults = data.query.pages;
            var panelsHtml = "";
            Object.keys(searchResults).forEach(function(pageid){
              // URL of the Wikipedia page of each serch result
              var url = "https://en.wikipedia.org/wiki/" + searchResults[pageid].title.replace(/\s/, "_");

              // create HTML element of each search result
              panelsHtml +=
                '<div>'
                + '<a href=\"' + url + '\" target="_blank">'
                + '<div class="card">'
                + '<div class="card-body">'
                + '<h5 class="card-title">' + searchResults[pageid].title + '</h5>'
                + '<p class="card-text">' + searchResults[pageid].extract + '</p>'
                + '</div>'
                + '</div>'
                + '</a>'
                + '</div>';
            });
            $("#results").html(panelsHtml);

          } else { // if "query" does not exist in returned JSON
            $("#results").html("No results.");
          };

        }, // end success handler
        error: function(){
          $("#results").html("An error has occured.");
        },
        xhrFields: {
          withCredentials: false
        }
      }); // end ajax
    } else {
      // If the textBox is empty
      $("#results").html("Input search keywords.")
    };
  });
});