class SavedWeather extends React.Component {
    render() {

        // If no locations saved, don't display
        if(this.props.saved.length === 0) {
            return null;
        }

        return (
            <ul className="list-group" id="saved-list">
                <li className="list-group-item" id="list-head">My Locations</li>
                {
                    this.props.saved.map((location, index) => (
                        <li className="list-group-item" id={location} key={index}>
                            <a href="#" onClick={(e) => this.savedClick(e, location)}>{location}</a>
                            <a href="#" className="pull-right" onClick={(e) => this.removing(e, location)}>Remove</a>
                        </li>
                    ))
                }
            </ul>
        )
    }

    // On click, show weather for location
    savedClick(e, location) {
        e.preventDefault();

        this.props.onClick(location);
    }

    // On remove, remove from local storage and html
    removing(e, location) {
        e.preventDefault();

        this.props.onRemove(location);

        var removeLocation = document.getElementById(location);
        removeLocation.parentNode.removeChild(removeLocation);
    }
}
