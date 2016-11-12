class SavedWeather extends React.Component {
    render() {
        return (
            <ul className="list-group" id="saved-list">
                <li className="list-group-item" id="list-head">My Locations</li>
                {
                    this.props.saved.map((location) => (
                        <li className="list-group-item" key={location}>
                            <a href="#" onClick={(e) => this.onSavedClick(e, location)}>
                                {location}
                            </a>
                        </li>
                    ))
                }
            </ul>
        )
    }

    onSavedClick(e, location) {
        e.preventDefault();

        this.props.onClick(location);
    }

}