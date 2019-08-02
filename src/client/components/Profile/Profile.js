import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import actions from "./actions";
import LocationAutoSuggestion from "../Registration/LocationAutoSuggestion";
import PhotoDropzone from "../Registration/PhotoDropzone";
import Review from "../Restaurant/Review";

class Profile extends React.Component {
    // this.props.match.params.user is the user that its profile is wanted
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.onPhoto = this.onPhoto.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            newUsername: this.props.match.params.user,
            newLocation: '',
            newPhoto: null,
            // TODO: newReviews
        };
        console.log('props on ctor: ', this.props);
    }

    componentDidMount() {
        this.props.fetchProfile(this.props.match.params.user);
    }

    componentWillUnmount() {
        this.props.clearProfile();
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

    handleSubmit(event) {
        event.preventDefault();
        let {newUsername, newPhoto, newLocation} = this.state;

        console.log('Submitting');
        this.props.updateProfile(this.props.username, {
            username: newUsername,
            location: newLocation,
            photo: newPhoto
        });
    }

    render() {
        let editable = this.props.username === this.props.loggedUser;
        let photo = this.props.photo.get('data');
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <div> {this.props.username} </div>
                    </label>
                    <label>
                        Location:
                        <div> {this.props.location} </div>
                    </label>
                    <label>
                        <div> Photo:</div>
                        <img src={photo} width={400} height={400}/>
                    </label>
                    <label>
                        <div> Reviews:</div>
                    </label>

                    {this.props.reviews.map((review, index) => (
                        <Review key={index} index={index} review={review}/>
                    ))}

                    <div hidden={!editable}>
                        <h2> Update profile </h2>

                        <label>
                            New username:
                            <input type="text"
                                   name="username"
                                   value={this.state.newUsername}
                                   onChange={this.handleChangeUsername}
                                   disabled={!editable}
                            />
                        </label>
                        <label>
                            New Location:
                            <LocationAutoSuggestion onLocation={this.onLocation}
                                                    disabled={!editable}/>
                        </label>
                        <label>
                            New photo:
                            <div>
                                <PhotoDropzone onPhoto={this.onPhoto}/>
                            </div>
                        </label>
                        <input type="submit" value="Update"/>
                    </div>
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
        },
        updateProfile: (user, newProfile) => {
            dispatch(actions.updateProfileRequestAction(user, newProfile));
        },
        clearProfile: () => {
            dispatch(actions.clearProfileAction());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
