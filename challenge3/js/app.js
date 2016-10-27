"use strict";

var reportSelect = document.querySelector("#report-select");
var table = document.querySelector(".table");
var report = document.querySelector("#report");

//ONLY STAR WARS: Extract Star Wars Movies
var starWars = MOVIES.filter(function (movie) {
    var title = movie.title.toLowerCase();
    if(title.includes("star wars") === true) {return movie;}
});

//ONLY STAR WARS: Sort by Title
starWars.sort(function (a, b) {
    return a.title.toString().localeCompare(b.title);
});

//ONLY STAR WARS: Create an array with formatted properties
var onlyStarWars = [];
format(onlyStarWars, starWars);

//RE-RELEASED TWENTIETH CENTURY MOVIES: Extract rereleased movies
var rerelease = MOVIES.filter(function (movie) {
    var substr = movie.released.substr(0, 10);
    if(movie.released <= "2000-01-01") {return movie;}
});

//RE-RELEASED TWENTIETH CENTURY MOVIES: Sort rerelease by released and year
rerelease.sort(function(a,b) {
    if(a.released != b.released) {
        if(a.released < b.released) {return -1}
        else {return 1;}
    }else {
        return a.year - b.year;
    }
});

//RE-RELEASED TWENTIETH CENTURY MOVIES: Create an array with formatted properties
var rereleasedTwentieth = [];
format(rereleasedTwentieth, rerelease);

//AVERAGE SALES BY GENRE: Create object with set of genre
//Referred to link below to create object of sales sum by genre and number of movies per genre:
//https://egghead.io/lessons/javascript-array-prototype-reduce-in-javascript-by-example
var genreSalesSum = MOVIES.reduce(function (genreGroup, movie) {
    if(!genreGroup[movie.genre]) {genreGroup[movie.genre] = 0;}
    genreGroup[movie.genre] += movie.sales;
    return genreGroup;
}, {});

//AVERAGE SALES BY GENRE: Create object with sum of sales for each genre
var genreMovieNum = MOVIES.reduce(function (genreGroup, movie) {
    if(!genreGroup[movie.genre]) {genreGroup[movie.genre] = 0;}
    genreGroup[movie.genre]++;
    return genreGroup;
}, {});

//AVERAGE SALES BY GENRE: Create array of sum of sales per genre
var genre = Object.keys(genreSalesSum);
var sum = Object.keys(genreSalesSum).map(function(key) {
    return genreSalesSum[key];
});

//AVERAGE SALES BY GENRE: Create array of number of movies per genre
var num = Object.keys(genreMovieNum).map(function(key) {
    return genreMovieNum[key];
});

//AVERAGE SALES BY GENRE: Calculate and formats average sales and put into object array
var genreAverageSales = [];
for(var i=0; i<genre.length; i++) {
    var avg = numeral(sum[i]/num[i]).format('$0,0.00');
    genreAverageSales.push({
        genre: genre[i],
        average: avg
    })
}

//AVERAGE SALES BY GENRE: Remove blank genre
genreAverageSales = genreAverageSales.filter(function(movie) {
    return movie.genre !== '';
});

//AVERAGE SALES BY GENRE: Sort alphabetically by genre
genreAverageSales.sort(function (a, b) {
    var a = numeral().unformat(a.average);
    var b = numeral().unformat(b.average);
    return b - a;
});

//TOP 100 MOVIES BY TICKETS SOLD: Calculate sum of tickets for each distinct movie and sort into array
//http://stackoverflow.com/questions/21819819/summarize-array-of-objects-and-calculate-average-value-for-each-unique-object-na
function sumTickets(movies) {
    var sum = {}, results = [], title;
    for (var i=0; i<movies.length; i++) {
        title = movies[i].title;
        if (!(title in sum)) {
            sum[title] = 0;
        }
        sum[title] += movies[i].tickets;
    }

    for(title in sum) {  
        results.push({ title: title, tickets: numeral(sum[title]).format('0,0')});   
    }

    results.sort(function (a, b) {
        return numeral().unformat(b.tickets) - numeral().unformat(a.tickets);
    });
    return results;
}

//TOP 100 MOVIES BY TICKETS SOLD: Slice 100 from array
var topHundred = sumTickets(MOVIES).slice(0, 100);

//BUILD TABLE: Create elements needed for Star Wars and Rerelease Tables
function buildTable() {
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");
   
    var threadRow = document.createElement("tr");
   
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

//BUILD GENRE TABLE: Create elements needed for Genre Table
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

//BUILD TOP100 TABLE: Create elements needed for Top Movies Table
function topMoviesTable() {
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    var threadRow = document.createElement("tr");

    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var totalTh = document.createElement("th");
    totalTh.textContent = "Total Tickets Sold";
    totalTh.style.textAlign = "right";

    threadRow.appendChild(titleTh);
    threadRow.appendChild(totalTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}

//BUILD TABLE ELEMENTS FOR ALL REPORTS
//Function to create the table elements for an array of movies.
function buildRows(rows, e) {
    if(e === "avg-by-genre") {
        genreTable();
    }else if(e === "top-by-tickets") {
        topMoviesTable();
    }else {
        buildTable();
    }
    var tbody = document.querySelector("tbody");
    rows.forEach(function (movie) {
        var titleTr = document.createElement("tr");
        var titleKeys = Object.keys(movie);
        titleKeys.forEach(function (key) {
            var value = movie[key];
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
        buildRows(onlyStarWars, value);
    }else if (value === "20th") {
        report.innerHTML="<h2>Re-released Twentieth Century Movies</h2>";
        buildRows(rereleasedTwentieth, value);
    }else if (value === "avg-by-genre") {
        report.innerHTML="<h2>Average Sales by Genre</h2>";
        buildRows(genreAverageSales, value);   
    }else if (value === "top-by-tickets") {
        report.innerHTML="<h2>Top 100 Movies by Tickets Sold</h2>";
        buildRows(topHundred, value);
    }else {
        buildRows(MOVIES);
    }
});

//Pushes formatted data from old array to new array
function format(newArray, oldArray) {
    for(i = 0; i < oldArray.length; i++) {
    var sales = numeral(oldArray[i].sales).format('$0,0[.]00');
    var tickets = numeral(oldArray[i].tickets).format('0,0');
    var date = moment(new Date(oldArray[i].released)).format('l');
    newArray.push({
        title: oldArray[i].title,
        released: date,
        distributor: oldArray[i].distributor,
        genre: oldArray[i].genre,
        rating: oldArray[i].rating,
        year: oldArray[i].year,
        sales: sales,
        tickets: tickets
    })
    }
}
