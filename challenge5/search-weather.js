class SearchWeather extends React.Component {
    render() {

        return (
            <form className="search-bar" onSubmit={(e) => this.searching(e)}>
                <input type="text" ref="query" id="search-input" placeholder="e.g. Seattle, 98115"/>
                <button type="submit" className="btn btn-primary btn block" id="search-button">Search</button>
            </form>
        )
    }

    searching(e) {
        e.preventDefault();
        var queryValue = this.refs.query.value;
        this.props.onSearching(queryValue);
    }
}
