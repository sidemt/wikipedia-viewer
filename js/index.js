$(document).ready(function() {
  $.ajax({
    url: "//en.wikipedia.org/w/api.php",
    data: {action: "query", format: "json", list: "search", srsearch: "NASA", srlimit: "10" },
    type: "GET",
    dataType: "jsonp",
    success: function (data){
      $("#resultTitle").html(data.query.search[0].title);
    },
    xhrFields: {
      withCredentials: false
    } 
  }); // end ajax
});