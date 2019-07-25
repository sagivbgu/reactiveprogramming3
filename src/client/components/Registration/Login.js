import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import './login.scss';
import actions from './actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearError();
    }

    handleChangeUsername(event) {
        this.props.setUsername(event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Submitting');
        console.log(this.props.username);
        this.props.login(this.props.username);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text"
                               name="username"
                               value={this.props.username}
                               onChange={this.handleChangeUsername}
                        />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <div className="error-message"> {this.props.error} </div>
                <Link to="/registration/">Sign up</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state['registration'].get('username'),
        error: state['registration'].get('error')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsername: (username) => {
            dispatch(actions.setUsernameAction(username));
        },
        login: (username) => {
            dispatch(actions.loginRequestAction(username));
        },
        clearError: () => {
            dispatch(actions.clearErrorAction());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
