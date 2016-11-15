class CurrentWeather extends React.Component {   
    render() {
<<<<<<< HEAD

        // If nothing is searched, a location is saved, and it is the first load, display location
=======
        // If user did not search on page load, but has saved locations, display first saved location
>>>>>>> react-challenge
        if(!this.props.queryValue && this.props.saved && !this.props.quit) {
            this.props.firstSaving();
        }

<<<<<<< HEAD
        // If no name is set yet, return null
        if(!this.props.name){
=======
        // If location name is null, don't display anything
        if(!this.props.name) {
>>>>>>> react-challenge
            return null;
        }

        // Return the weather information display
        return (
            <div className="current-display">
                <h2>{this.props.name}</h2>
                <img src={this.props.icon} />
                <p className="descr"><span>{this.props.fullDescr}</span></p>
                <h3 className="temp">{this.props.temp}<span className="max">Max: {this.props.tempMax}<span>Min: {this.props.tempMin}</span></span></h3>
                <button id="save-button" className="btn btn-default" onClick={(e) => this.save(e)}>Save</button>
            </div>
        );
    }

<<<<<<< HEAD
    // Save the location if button is clicked
=======
    // Save location on button click
>>>>>>> react-challenge
    save(e) {
        this.props.onSave(this.props.queryValue);
    }
}
