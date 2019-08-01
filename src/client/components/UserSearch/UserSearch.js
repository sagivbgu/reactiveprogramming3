import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import SearchField from "react-search-field";

import actions from "./actions";

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(text) {
        console.log('Submitting');
        this.props.search(text);
    }

    render() {
        return (
            <div>
                <SearchField
                    placeholder="Search..."
                    onEnter={this.handleSearch}
                    onSearchClick={this.handleSearch}
                    // onChange={this.handleSearch}
                    // searchText="This is initial search text"
                />

                <ul>
                    {this.props.results.map((item, index) => (
                        <li key={item}> {item} </li>
                    ))}
                </ul>

                <div className="error-message"> {this.props.error} </div>
                <Link to="/home/">Back to home page</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('STATE: ', state);
    return {
        results: state['userSearch'].get('results'),
        error: state['userSearch'].get('error')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (query) => {
            dispatch(actions.searchUserAction(query));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
