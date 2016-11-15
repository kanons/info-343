var API_KEY = 'da64e698782fb099e20ce1918842f33d';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: [],
        }
    }

    componentDidMount() {
        var savedLocationsJSON = localStorage.getItem('savedLocations');
        var savedLocations = JSON.parse(savedLocationsJSON);

        if(savedLocations) {
            this.setState({
                saved: savedLocations
            });
        }
    }

    render() {
        return (
            <div className="weather-page">
                <div className="heading">
                    <h1>Weather Watch</h1>
                </div>
                <div className="row">  
                    <div className="col-md-6 col-xs-12" id="current-weather">
                        <SearchWeather
                            onSearching={(queryValue) => this.onSearch(queryValue)}
                        />
                        <div id="search-alert" className="alert alert-danger" role="alert"></div>
                        {
                                <CurrentWeather
                                    saved={this.state.saved}
                                    firstSaving={() => this.firstSaved()}
                                    quit={this.state.quit}

                                    name={this.state.name}
                                    queryValue={this.state.queryValue}
                                    icon={this.state.icon}
                                    fullDescr={this.state.fullDescr}
                                    temp={this.state.temp}
                                    tempMax={this.state.tempMax}
                                    tempMin={this.state.tempMin}
                                    onSave={(queryValue) => this.saveLocation(queryValue)}
                                />
                        }
                </div>
                <div className="col-md-6 col-xs-12" id="saved-weather">
                    {
                        <SavedWeather
                            saved={this.state.saved}
                            onClick={(location) => this.searchLocation(location)}
                            onRemove={(location) => this.removeSaved(location)}
                        />
               
                    }
                </div>
            </div>
        </div>
        );
    }

    change(e) {
        e.preventDefault();
        
    }

    firstSaved() {
        if(this.state.saved.length!=0){
            var savedArray = JSON.parse(localStorage.getItem('savedLocations'));
            var firstSaved = savedArray[0];
            this.searchLocation(firstSaved);
        }
    }

    // Search input value location
    onSearch(queryValue) {
        var alert = document.getElementById("search-alert");
        alert.classList.remove('active');
        this.setState({
            queryValue : queryValue
        });

        this.searchLocation(queryValue);
    }

    // Add location to location storage
    saveLocation(name) {
        var saved = this.state.saved;

        saved.push(name);

        this.setState({
            saved: saved
        });
        
        // Save to local storage
        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedLocations', savedJson);
    }

    // Remove location from local storage
    // http://stackoverflow.com/questions/8127075/localstorage-json-how-can-i-delete-only-1-array-inside-a-key-since-localstora
    removeSaved(location) {
        var savedArray = JSON.parse(localStorage.getItem('savedLocations'));
        for(var i=0; i<savedArray.length; i++) {
            if(savedArray[i] === location) {
                savedArray.splice(i,1);
                //window.localStorage.removeItem('savedLocations', savedArray[i]);
            }
            
        }
        localStorage.setItem("savedLocations", JSON.stringify(savedArray));
    }

    // Get weather information from api
    searchLocation(location) {
        var alert = document.getElementById("search-alert");
        
        if(typeof location === 'number'){
            var url = "https://www.bell-towne.com/api/weather?zip="+location+"&units=imperial&appid="+API_KEY;
            var quit = false;
        }else{
            var url = "https://www.bell-towne.com/api/weather?q=" +location+"&units=imperial&appid="+ API_KEY;
            var quit = false;
        }

        if(quit){
            return;
        }else{
            quit=true;
        }
        
        fetch(url)
        .then((response) => {
            
            return response.json();
        })
        .then((json) => {
            
            var getWeather = json.weather[0];

            var getMain = json.main;

            var name = json.name;

            var temp = Math.ceil(((getMain.temp)/100)*100)+"°F";

            var tempMin = Math.ceil(((getMain.temp_min)/100)*100)+"°F";

            var tempMax = Math.ceil(((getMain.temp_max)/100)*100)+"°F";

            var main = getWeather.main;

            var descr = getWeather.description;

            var fullDescr = main+" ("+descr+")";

            var icon = "http://openweathermap.org/img/w/"+getWeather.icon+".png";

            if(location.toLowerCase() != name.toLowerCase() && location.toString().length != 5) {
                alert.classList.add('active');
                alert.textContent="Invalid Location";
                this.setState ({
                    name: null
                });
                return;
            }

            this.setState({
                icon: icon,
                name: name,
                descr: descr,
                main: main,
                temp: temp,
                fullDescr: fullDescr,
                quit: quit,
                tempMin: tempMin,
                tempMax: tempMax
            });
            
        })
        .catch((error) => {
            if(!location){
                alert.classList.add('active');
                alert.textContent="Invalid Location";
            }else{
                alert.classList.add('active');
                alert.textContent=error;
            }
        });
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
