var API_KEY = 'da64e698782fb099e20ce1918842f33d';

var error = false;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
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
        if(error === true){
            return(<div id="search-alert" className="alert alert-danger" role="alert">Invalid location.</div>);
        }
        return (
            <div className="weather-page">
                    <div className="heading">
                        <h1>Weather Watch</h1>
                    </div>
                <div className="row">  
                    <div className="col-md-6 col-xs-12" id="current-weather">
                        <form className="search-bar" onSubmit={(e) => this.onSearch(e)}>
                            <input type="text" ref="query" id="search-input" placeholder="e.g. Seattle, 98115"/>
                            <button type="submit" className="btn btn-primary btn block" id="search-button">Search</button>
                        </form>
                        {
                            this.state.name ? (
                                <CurrentWeather
                                    name={this.state.name}
                                    icon={this.state.icon}
                                    fullDescr={this.state.fullDescr}
                                    temp={this.state.temp}
                                    onSave={(name) => this.saveLocation(name)}
                                />
                            ): null
                        }
                </div>
                <div className="col-md-6 col-xs-12" id="saved-weather">
                    {
                        this.savedLocations ? (
                            <SavedWeather
                                saved={this.state.saved}
                                onClick={(location) => this.searchLocation(location)}
                                onRemove={(location) => this.removeSaved(location)}
                            />
                        ):null
                    }
                </div>
            </div>
        </div>
        );
    }



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

    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        this.searchLocation(queryValue);
    }

    //http://stackoverflow.com/questions/8127075/localstorage-json-how-can-i-delete-only-1-array-inside-a-key-since-localstora
    removeSaved(location) {
        var savedArray = JSON.parse(localStorage.getItem('savedLocations'));
        for(var i=0; i<savedArray.length; i++) {
            if(savedArray[i] === location) {
                savedArray.splice(i,1);
            }
            localStorage.setItem("savedLocations", JSON.stringify(savedArray));
        }
    }

    searchLocation(location) {

        if(typeof location === 'number'){
            var url = "api.openweathermap.org/data/2.5/weather?zip={"+location+"}&appid="+API_KEY;
        }else{
            var url = "http://api.openweathermap.org/data/2.5/weather?q={" +location+"}&appid="+ API_KEY;
        }
        
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {

            var getWeather = json.weather[0];

            var getMain = json.main;

            var name = json.name;

            var farenheit = ((getMain.temp)*(9/5))- 459.67;

            var temp = Math.ceil(((farenheit)/100)*100)+"°F";

            var main = getWeather.main;

            var descr = getWeather.description;

            var fullDescr = main+" ("+descr+")";

            var icon = "http://openweathermap.org/img/w/"+getWeather.icon+".png";



            this.setState({
                icon: icon,
                name: name,
                descr: descr,
                main: main,
                temp: temp,
                fullDescr: fullDescr
            });
        })
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
