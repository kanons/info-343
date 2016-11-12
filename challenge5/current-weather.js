class CurrentWeather extends React.Component {
    render() {
        if(!this.props.name) {
            return null;
        }

        return (
            <div className="current-display">
                <h2>{this.props.name}</h2>
                    <img src={this.props.icon} />

                        <h2 className="temp">{this.props.temp} <span>{this.props.fullDescr}</span></h2>

                <button id="save-button" className="btn btn-default" onClick={(e) => this.save(e)}>Save</button>
            </div>
        );
    }

    save(e) {
        this.props.onSave(this.props.name);
    }
}
