class CurrentWeather extends React.Component {   
    render() {
        if(!this.props.queryValue && this.props.saved && !this.props.quit){
            this.props.firstSaving();
        }

        if(!this.props.name){
            return null;
        }

        return (
            <div className="current-display">
                <h2>{this.props.name}</h2>
                    <img src={this.props.icon} />
                    <p className="descr"><span>{this.props.fullDescr}</span></p>
                    <h2 className="temp">{this.props.temp}<span className="max">High: {this.props.tempMax}<span>Low: {this.props.tempMin}</span></span></h2>
                    

                <button id="save-button" className="btn btn-default" onClick={(e) => this.save(e)}>Save</button>
            </div>
        );
    }

    save(e) {
        this.props.onSave(this.props.queryValue);
    }
}
