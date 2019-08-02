import React from 'react';
import {connect} from 'react-redux';
import AppActions from "../App/actions";
import Restaurants from "../Restaurants/Restaurants";
import Profile from "../Profile/Profile";
import {Link} from "react-router-dom";


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
                <div> Hi {loggedUser}!</div>
                <div><Link to={`/user/profile/${loggedUser}`}>Profile</Link></div>
                <div>
                    <Link to="/user/search">Search users</Link>
                </div>
                <div>
                    {loggedUser && <button className={'link'} onClick={this.onLogoutClicked}> Logout </button>}
                </div>
                <Restaurants history={this.props.history}/>
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
