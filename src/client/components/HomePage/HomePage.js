import React from 'react';
import {connect} from 'react-redux';
import AppActions from "../App/actions";
import Restaurants from "../Restaurants/Restaurants";
import Profile from "../Profile/Profile";
import {Link} from "react-router-dom";
import RestaurantSearch from "../Restaurants/RestaurantSearch";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.onLogoutClicked = this.onLogoutClicked.bind(this);
    }

    onLogoutClicked() {
        this.props.logout();
        this.props.history.push('/login/');
    }

    render() {
        let loggedUser = this.props.loggedUser;
        return (
            <div>
                <h2> Home page </h2>
                <div> Hi {loggedUser}! What would you like to do?</div>
                <div><Link to={`/user/profile/${loggedUser}`}>Show profile</Link></div>
                <div>
                    <Link to="/user/search">Search users</Link>
                </div>
                <div>
                    <Link to="/restaurants/search/">Search restaurants</Link>
                </div>
                <div>
                    {loggedUser && <button className={'link'} onClick={this.onLogoutClicked}> Logout </button>}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loggedUser: state['app'].get('loggedUser')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(AppActions.logoutAction())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
