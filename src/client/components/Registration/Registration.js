import React from 'react';
import {connect} from 'react-redux';
import ReactDropzone from "react-dropzone";

import './registration.scss';
import actions from './actions';
import LocationAutoSuggestion from "./LocationAutoSuggestion";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {username: ""};
    }

    handleChangeUsername(event) {
        let username = event.target.value;
        this.setState({username: username});
        this.props.validateUsernameUnique(username);
    }

    onDrop(files) {
        console.log(files);
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log('Location: ' + this.props.location);
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
                                    Click or drag to upload a photo
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
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usernameUnique: state['registration'].get('usernameUnique'),
        location: state['registration'].get('location')
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
