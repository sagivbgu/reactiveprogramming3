import React from 'react';
import {connect} from 'react-redux';

import actions from './actions';
import LocationAutoSuggestion from "./LocationAutoSuggestion";
import {Link, Redirect} from "react-router-dom";
import PhotoDropzone from "./PhotoDropzone";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.onPhoto = this.onPhoto.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            photo: null,
            location: ''
        };
    }

    componentDidMount() {
        this.props.clearError();
        this.props.validateUsernameUnique(this.props.username);
    }

    handleChangeUsername(event) {
        let username = event.target.value;
        this.props.setUsername(username);
        this.props.validateUsernameUnique(username);
    }

    onPhoto(photo) {
        this.setState({photo: photo});
    }

    onLocation(location) {
        this.setState({location: location});
    }

    handleSubmit(event) {
        event.preventDefault();
        let {username, usernameUnique} = this.props;
        let {photo, location} = this.state;

        console.log('Location: ' + location);
        if (usernameUnique) {
            console.log('Submitting');
            console.log(username);
            console.log(location);
            console.log('photo: ' + JSON.stringify(photo));
            console.log('unique: ' + usernameUnique);
            this.props.register(username, location, photo);
        } else {
            console.log('Not submitting. Username is not unique.')
        }
    }

    render() {
        return (
            <div>
                {this.props.loggedUser && <Redirect to="/home/"/>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text"
                               name="username"
                               value={this.props.username}
                               onChange={this.handleChangeUsername}
                        />
                        <span className='error-message'>
                        {this.props.username && this.props.usernameUnique === false && 'Username already exists!'}
                    </span>
                    </label>
                    <label>
                        <div> Photo:</div>
                        <PhotoDropzone onPhoto={this.onPhoto}/>
                    </label>
                    <label>
                        Location:
                        <LocationAutoSuggestion onLocation={this.onLocation}/>
                    </label>
                    <input type="submit" value="Submit"/>
                    <div className="error-message"> {this.props.error} </div>
                </form>
                <Link to="/login/">Back to login</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state['app'].get('loggedUser'),
        username: state['registration'].get('username'),
        usernameUnique: state['registration'].get('usernameUnique'),
        location: state['registration'].get('location'),
        error: state['registration'].get('error')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsername: (username) => {
            dispatch(actions.setUsernameAction(username));
        },
        validateUsernameUnique: (username) => {
            dispatch(actions.validateUsernameUniqueAction(username));
        },
        register: (username, location, photo) => {
            console.log('dispatching ' + JSON.stringify(actions.registerUserAction(username, location, photo)));
            dispatch(actions.registerUserAction(username, location, photo));
        },
        clearError: () => {
            dispatch(actions.clearErrorAction());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
