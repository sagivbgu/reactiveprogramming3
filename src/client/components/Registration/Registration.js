import React from 'react';
import {connect} from 'react-redux';
import ReactDropzone from "react-dropzone";

import './registration.scss';
import actions from './actions';
import LocationAutoSuggestion from "./LocationAutoSuggestion";
import {Link} from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {photo: null};
    }

    componentDidMount() {
        this.props.clearError();
    }

    handleChangeUsername(event) {
        let username = event.target.value;
        this.props.setUsername(username);
        this.props.validateUsernameUnique(username);
    }

    onDrop(files) {
        console.log(files);
        console.log(files[0]);
        this.setState({photo: files[0]});
    }

    handleSubmit(event) {
        event.preventDefault();
        let {username, usernameUnique, location} = this.props;
        let {photo} = this.state;

        console.log('Location: ' + location);
        if (usernameUnique) {
            console.log('Submitting');
            console.log(username);
            console.log(location);
            console.log('photo: ' + JSON.stringify(photo));
            console.log('unique: ' + usernameUnique);
            this.props.register(username, location, photo)
        } else {
            console.log('Not submitting. Username is not unique.')
        }
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
                        <span className='error-message'>
                        {this.props.username && this.props.usernameUnique === false && 'Username already exists!'}
                    </span>
                    </label>
                    <label>
                        <div>
                            Photo:
                        </div>
                        <div id='registration-dropzone'>
                            <ReactDropzone
                                onDrop={this.onDrop}
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                multiple={false}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {this.state.photo ? this.state.photo.path : 'Click or drag to upload a photo'}
                                    </div>
                                )}
                            </ReactDropzone>
                        </div>
                    </label>
                    <label>
                        Location:
                        <LocationAutoSuggestion/>
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
