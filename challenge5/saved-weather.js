class SavedWeather extends React.Component {
    render() {
        return (
            <ul className="list-group" id="saved-list">
                <li className="list-group-item" id="list-head">My Locations</li>
                {
                    this.props.saved.map((location) => (
                        <li className="list-group-item" id={location} key={location}>
                            <a href="#" onClick={(e) => this.savedClick(e, location)}>
                                {location}
                            </a>
                            <a href="#" className="pull-right" onClick={(e) => this.removing(e, location)}>
                                Remove
                            </a>
                        </li>
                    ))
                }
            </ul>
        )
    }

    savedClick(e, location) {
        e.preventDefault();

        this.props.onClick(location);
    }

    removing(e, location) {
        e.preventDefault();

        this.props.onRemove(location);

        var removeLocation = document.getElementById(location);
        removeLocation.parentNode.removeChild(removeLocation);
    }
}