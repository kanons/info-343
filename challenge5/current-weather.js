class CurrentWeather extends React.Component {   
    render() {

        // If nothing is searched, a location is saved, and it is the first load, display location
        if(!this.props.queryValue && this.props.saved && !this.props.quit) {
            this.props.firstSaving();
        }

        // If no name is set yet, return null
        if(!this.props.name){
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

    // Save the location if button is clicked
    save(e) {
        this.props.onSave(this.props.queryValue);
    }
}
