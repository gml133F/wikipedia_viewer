//Get data from Wikipedia API
function getWiki(url) {
  $.getJSON(url, function(json) {
    update(json);
  });
}

//Update results on the page
function update(json) {
  //reset results
  $("#results").html("");

  //No results
  if (json[1].length === 0) {
    $("#results").append(
      "<span class='align-center'>Sorry, no results came back for " +
        json[0] +
        "</span>"
    );
  } else {
    //add results and define form action
    for (i = 0; i < json[1].length; i++) {
      var createResults =
        "<a href='" +
        json[3][i] +
        "'' target='_blank'>" +
        "<div class='result-item'><h3>" +
        json[1][i] +
        "</h3> <p>" +
        json[2][i] +
        "</p></div></a>";
      $("#results").append(createResults);
      console.log(json[3][0]);
    }
    $("form").attr("action", json[3][0]);
  }
}

//hide random link and show buttons
function anim() {
  var searchString = $("#searchString").val();

  var url =
    "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
    searchString +
    "&utf8=1";

  if (searchString) {
    $("img").fadeOut(600, function() {
      $("img").css("display", "none");
      getWiki(url);
    });
  } else {
    $("#results").html("");
    $("img").fadeIn(900);
  }
}

$(document).ready(function() {
  //$("#search").click(function (){
  $("#searchString").keyup(function() {
    anim();
  });

  $("#new").click(function() {
    $("#searchString").val("");
    $("#searchString").focus();
    anim();
  });
});
