import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import SearchField from "react-search-field";

import './restaurantsearch.scss';
import actions from "./actions";
import Restaurants from "./Restaurants";

class RestaurantSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            byName: true,
            byLocation: false
        }
    }

    componentWillUnmount() {
        this.props.clearSearch();
    }

    handleSearch(text) {
        console.log('Submitting');
        let {byName, byLocation} = this.state;
        console.log('byName: ', byName);
        console.log('byLocation: ', byLocation);
        this.props.search(text, byName, byLocation);
    }

    render() {
        return (
            <div>
                <SearchField
                    placeholder="Search..."
                    onEnter={this.handleSearch}
                    onSearchClick={this.handleSearch}
                    onChange={this.handleSearch}
                />
                <div>
                    By name:
                    <input type="checkbox" checked={this.state.byName}
                           onChange={() => this.setState({byName: !this.state.byName})}
                           className="checkbox-style"/>
                </div>
                <div>
                    By location:
                    <input type="checkbox" checked={this.state.byLocation}
                           onChange={() => this.setState({byLocation: !this.state.byLocation})}
                           className="checkbox-style"/>
                </div>

                <div>
                    <Restaurants history={this.props.history}/>
                </div>

                <div>
                    <Link to="/home/">Back to home page</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('STATE: ', state);
    return {
        restaurants: state['restaurants']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (query, byName, byLocation) => {
            dispatch(actions.searchRestaurantAction(query, byName, byLocation));
        },
        clearSearch: () => {
            dispatch(actions.clearRestaurantSearchAction());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSearch);
