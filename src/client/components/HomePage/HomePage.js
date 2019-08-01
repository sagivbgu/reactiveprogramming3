import React from 'react';
import {connect} from 'react-redux';
import AppActions from "../App/actions";
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
        return (
            <div>
                <h3> Home page </h3>
                {/*<Profile user={this.props.loggedUser}/>*/}
                <div>
                    <Link to="/user/search">Search users</Link>
                </div>
                <div>
                    {this.props.loggedUser && <button onClick={this.onLogoutClicked}> Logout </button>}
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
