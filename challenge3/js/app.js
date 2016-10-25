"use strict";

var reportSelect = document.querySelector("#report-select");
var table = document.querySelector(".table");
var report = document.querySelector("#report");

//ONLY STAR WARS: Extract Star Wars Movies
var starWars = MOVIES.filter(function (movie) {
    var title = movie.title.toLowerCase();
    if(title.includes("star wars")==true) {return movie;}
});

//ONLY STAR WARS: Sort by Title
starWars.sort(function (a, b){
    return a.toString().localeCompare(b);
});

//RE-RELEASED TWENTIETH CENTURY MOVIES: Extract rereleased movies
var rerelease = MOVIES.filter(function (movie){
    var substr = movie.released.substr(0, 10);
    if(movie.released <= "2000-01-01") {return movie;}
});

//RE-RELEASED TWENTIETH CENTURY MOVIES: Sort rerelease by released and year
rerelease.sort(function(a,b){
    if(a.released != b.released){
        if(a.released < b.released) {return -1}
        else {return 1;}
    }else{
        return a.year - b.year;
    }
});

//AVERAGE SALES BY GENRE: Create Object array of genre and average sales
//Referred to link below to create object of sales sum by genre and number of movies per genre:
//https://egghead.io/lessons/javascript-array-prototype-reduce-in-javascript-by-example
var genreSalesSum = MOVIES.reduce(function (genreGroup, movie) {
    if(!genreGroup[movie.genre]) {genreGroup[movie.genre] = 0;}
    genreGroup[movie.genre] += movie.sales;
    return genreGroup;
}, {});

var genreMovieNum = MOVIES.reduce(function (genreGroup, movie) {
    if(!genreGroup[movie.genre]) {genreGroup[movie.genre] = 0;}
    genreGroup[movie.genre]++;
    return genreGroup;
}, {});

var genre = Object.keys(genreSalesSum);
var sum = Object.keys(genreSalesSum).map(function(key) {
    return genreSalesSum[key];
});
var num = Object.keys(genreMovieNum).map(function(key) {
    return genreMovieNum[key];
});

var genreAverageSales = [];
for(var i=0; i<genre.length; i++){
    var avg = numeral(sum[i]/num[i]).format('$0,0.00');
    genreAverageSales.push({
        genre: genre[i],
        average: avg
    })
}

genreAverageSales = genreAverageSales.filter(function(obj) {
    return obj.genre !== '';
});

//BUILDING TABLE: Create elements needed for Star Wars and Rerelease Tables
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
    salesTh.style.textAlign = "right";
    salesTh.textContent = "Sales";
    var ticketsTh = document.createElement("th");
    ticketsTh.style.textAlign = "right";
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

//BUILDING TABLE: Create elements needed for Genre Table
function genreTable() {
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    var threadRow = document.createElement("tr");

    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var avgSalesTh = document.createElement("th");
    avgSalesTh.textContent = "Average Sales";
    avgSalesTh.style.textAlign = "right";

    threadRow.appendChild(genreTh);
    threadRow.appendChild(avgSalesTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}

//BUILDING TABLE: Create elements needed for Top Movies Table
function topMoviesTable() {
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    var threadRow = document.createElement("tr");

    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var totalTh = document.createElement("th");
    totalTh.textContent = "Total Tickets Sold";

    threadRow.appendChild(titleTh);
    threadRow.appendChild(totalTicketsSoldTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}

//BUILDING TABLE ELEMENTS FOR ALL
//Function to create the table elements for an array of movies.
function buildRows(rows, e) {
    if(e === "avg-by-genre"){
        genreTable();
    }else if(e === "top-by-tickets"){
        topMoviesTable();
    }else{
        buildTable();
    }
    var tbody = document.querySelector("tbody");
    rows.forEach(function (movie) {
        if(e === "star-wars" || e === "20th"){
            format(movie);
        }
        var titleTr = document.createElement("tr");
        var titleKeys = Object.keys(movie);
        titleKeys.forEach(function (key) {
            var value = movie[key];
            if(value === null){
                value = '';
            }
            var td = document.createElement("td");
            td.textContent = value;
            if(key === "sales") {td.style.textAlign = "right";}
            if(key === "tickets") {td.style.textAlign = "right";}
            if(key === "released") {td.style.textAlign = "left";}
            if(key === "average") {td.style.textAlign = "right";}
            titleTr.appendChild(td);
        });
        tbody.appendChild(titleTr);
      });
}

//Creates table report
reportSelect.addEventListener("change", function (e) {
    table.innerHTML = "";
    var value = e.target.value;

    if (value === "star-wars") {
        report.innerHTML="<h2>Only Star Wars</h2>";
        buildRows(starWars, value);
    }else if (value === "20th") {
        report.innerHTML="<h2>Re-released Twentieth Century Movies</h2>";
        
        buildRows(rerelease, value);
    }else if (value === "avg-by-genre") {
        report.innerHTML="<h2>Average Sales by Genre</h2>";
        buildRows(genreAverageSales, value);   
    }else if (value === "top-by-tickets") {
        report.innerHTML="<h2>Top 100 Movies by Tickets Sold</h2>";
        buildRows(topMovies, value)
    }else {
        buildRows(MOVIES);
    }
});

//Format report
function format(movie){
    var date = moment(new Date(movie.released));
    movie.released = date.format('l');

    var tickets = movie.tickets;
    
    movie.tickets = numeral(tickets).format('0,0');       

    var sales = movie.sales;
    movie.sales = numeral(sales).format('$0,0[.]00');
}
