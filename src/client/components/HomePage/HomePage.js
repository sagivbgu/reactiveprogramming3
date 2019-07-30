import React from 'react';
import {connect} from 'react-redux';
import AppActions from "../App/actions";
import Profile from "../Profile/Profile";


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
                <Profile user={this.props.loggedUser}/>
                {this.props.loggedUser && <button onClick={this.onLogoutClicked}> Logout </button>}
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
