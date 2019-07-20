import React from 'react';
import './registration.scss';
import {connect} from 'react-redux';
import actions from './actions';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {username: ""};
    }

    handleChangeUsername(event) {
        let username = event.target.value;
        this.setState({username: username});
        this.props.validateUsernameUnique(username);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.props.usernameUnique) {
            console.log('Submitting');
        } else {
            console.log('Not submitting. Username is not unique.')
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text"
                           name="username"
                           value={this.state.username}
                           onChange={this.handleChangeUsername}
                    />
                    {this.state.username && !this.props.usernameUnique && 'Username already exists!'}
                </label>
                <input type="submit" value="Submit"/>
            </form>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        usernameUnique: state['registration'].get('usernameUnique')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateUsernameUnique: (username) => {
            dispatch(actions.validateUsernameUniqueAction(username));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
