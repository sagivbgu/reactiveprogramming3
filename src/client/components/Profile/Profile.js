import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import actions from "./actions";
import LocationAutoSuggestion from "../Registration/LocationAutoSuggestion";
import PhotoDropzone from "../Registration/PhotoDropzone";

class Profile extends React.Component {
    // this.props.user is the user that its profile is wanted
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.onPhoto = this.onPhoto.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            newUsername: this.props.user,
            newLocation: '',
            newPhoto: null,
            // TODO: newReviews
        };
    }

    componentDidMount() {
        this.props.fetchProfile(this.props.user);
    }

    handleChangeUsername(event) {
        let username = event.target.value;
        this.setState({newUsername: username});
    }

    onPhoto(photo) {
        this.setState({newPhoto: photo});
    }

    onLocation(location) {
        this.setState({newLocation: location});
    }

    // TODO
    handleSubmit(event) {
        event.preventDefault();
        let {username, location} = this.props;
        let {newPhoto, newLocation} = this.state;

        console.log('Submitting');
        this.props.updateData(username, newLocation, newPhoto);
    }

    // TODO: Show data fetched from the server, including reviews
    render() {
        let editable = this.props.username === this.props.loggedUser;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text"
                               name="username"
                               value={this.props.username}
                               onChange={this.handleChangeUsername}
                               disabled={!editable}
                        />
                    </label>
                    <label>
                        <div> Photo:</div>
                        {/* TODO: DELETE this comment --->    <img src={`data:image/jpeg;base64,${data}`}/>*/}
                        <img src={this.props.photo.get('photo')}/>
                    </label>
                    <label>
                        {editable && <div> New photo:
                            <PhotoDropzone onPhoto={this.onPhoto}/>
                        </div>}
                    </label>
                    <label>
                        Location:
                        <LocationAutoSuggestion location={this.props.location} onLocation={this.onLocation}
                                                disabled={!editable}/>
                    </label>
                    <input type="submit" value="Update" disabled={!editable}/>
                </form>
                <div className="error-message"> {this.props.error} </div>
                <Link to="/home/">Back to home page</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('STATE: ', state);
    return {
        loggedUser: state['app'].get('loggedUser'),
        username: state['profile'].get('username'),
        location: state['profile'].get('location'),
        photo: state['profile'].get('photo'),
        reviews: state['profile'].get('reviews'),
        error: state['profile'].get('error')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfile: (username) => {
            dispatch(actions.fetchProfileRequestAction(username));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
