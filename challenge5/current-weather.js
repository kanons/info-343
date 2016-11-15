class CurrentWeather extends React.Component {   
    render() {

        // If user did not search on page load, but has saved locations, display first saved location
        if(!this.props.queryValue && this.props.saved && !this.props.quit) {
            this.props.firstSaving();
        }

        // If location name is null, don't display anything
        if(!this.props.name) {
            return null;
        }

        // Return the weather information display
        return (
            <div className="current-display">
                <h2>{this.props.name}</h2>
                <img src={this.props.icon} />
                <p className="descr"><span>{this.props.fullDescr}</span></p>
                <h3 className="temp">{this.props.temp}<span className="max">Max: {this.props.tempMax}<span>Min: {this.props.tempMin}</span></span></h3>
                <h4>Sunrise: {this.props.sunrise}</h4>
                <h4>Sunset: {this.props.sunset}</h4>
                <button id="save-button" className="btn btn-default" onClick={(e) => this.save(e)}>Save</button>
            </div>
        );
    }

    // Save location on button click
    save(e) {
        this.props.onSave(this.props.queryValue);
    }
}
