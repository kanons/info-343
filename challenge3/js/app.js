/*
app.js - application script for the movies challenge
add your code to this file
*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Document Ready")
});

var dropdown = document.querySelector("#dropdown");
var table = document.querySelector(".table");

//Extract Star Wars Movies
var starWars = MOVIES.filter(function (title) {
    return name.toLowerCase() === "star wars";
});



//Header and Table
function buildTable() {
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var releasedTh = document.createElement("th");
    releasedTh.textContent = "Released";

    var distributorTh = document.createElement("th");
    distributorTh.textContent = "Distributor";

    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var ratingTh = document.createElement("th");
    ratingTh.textContent = "Rating";

    var yearTh = document.createElement("th");
    yearTh.textContent = "Year";

    var salesTh = document.createElement("th");
    salesTh.textContent = "Sales";

    var ticketsTh = document.createElement("th");
    ticketsTh.textContent = "Tickets";

    // Append these elements to the table
    threadRow.appendChild(titleTh);
    threadRow.appendChild(releasedTh);
    threadRow.appendChild(distributorTh);
    threadRow.appendChild(genreTh);
    threadRow.appendChild(ratingTh);
    threadRow.appendChild(yearTh);
    threadRow.appendChild(salesTh);
    threadRow.appendChild(ticketsTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}


// Function to create the table elements for an array of names.
function buildRows(rows) {
    // First, build the table structure.
    buildTable();

    // Find the table body, where the rows will be rendered.
    var tbody = document.querySelector("tbody");

    // Iterate over each title,
    // create the tr (row element) and td elements (column elements)
    // and append to the table body.
    rows.forEach(function (title) {
        var titleTr = document.createElement("tr");

        // Object.keys returns an array of the keys object
        var titleKeys = Object.keys(title);

        // This makes it easy to iterate over the values
        // in the object by using bracket notation
        // to access each property in the object.
        titleKeys.forEach(function (key) {
            var value = title[key];

            var td = document.createElement("td");
            td.textContent = value;

            titleTr.appendChild(td);
        });

        tbody.appendChild(titleTr);
      });
}



// dropdown.addEventListener("change", function (e) {
//     // Removes all the elements in the able.
//     table.innerHTML = "";

//     // Get the current value of the dropdown,
//     // and build the table with the data for that value.
//     var value = e.target.value;

//     if (value === "Only Star Wars") {
//         buildRows(starWars);
//     // } else if (value === "female") {
//     //     buildRows(femaleNames);
//     } else {
//          buildRows(MOVIES);
//     }
// });

buildRows(MOVIES);


