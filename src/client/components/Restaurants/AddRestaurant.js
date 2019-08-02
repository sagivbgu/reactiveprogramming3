import React from "react";
import {connect} from 'react-redux';
import actions from "./actions";
import {Link} from "react-router-dom";

class AddRestaurant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            thumbnail: '',
            thumbnailHeight: 0,
            thumbnailWidth: 0,
            restaurantNameAlreadyExists: false,
            allFieldsAnsweredOnSubmit: true
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/home/">Back to home page</Link>
                </div>
                <form onSubmit={this.onFormSubmit}>
                    <label>
                        Restaurant name:
                        <input type="text"
                               name="name"
                               value={this.state.name}
                               onChange={this.onChange}
                        />
                        <span className='error-message'>
                        {this.state.restaurantNameAlreadyExists && 'Restaurant with the same name already exists!'}
                    </span>
                    </label>

                    <label>
                        Location:
                        <input type="text"
                               name="location"
                               value={this.state.location}
                               onChange={this.onChange}
                        />
                    </label>

                    <label>
                        Thumbnail url:
                        <input type="text"
                               name="thumbnail"
                               value={this.state.thumbnailUrl}
                               onChange={this.onChange}
                        />
                    </label>

                    <label>
                        Thumbnail height:
                        <input type="text"
                               name="thumbnailHeight"
                               value={this.state.thumbnailHeight}
                               onChange={this.onChange}
                        />
                    </label>

                    <label>
                        Thumbnail width:
                        <input type="text"
                               name="thumbnailWidth"
                               value={this.state.thumbnailWidth}
                               onChange={this.onChange}
                        />
                    </label>

                    <input type="submit" value="Submit"/>
                    <span className='error-message'>
                        {!this.state.allFieldsAnsweredOnSubmit && "Please fill all fields!"}
                </span>
                </form>
            </div>
        );
    }

    onChange(event) {
        const target = event.target;

        let restaurantNameAlreadyExists = this.state.restaurantNameAlreadyExists;
        if (target.name == "name") {
            let restaurant = this.props.restaurants.find(restaurant => {
                return restaurant.name === target.value;
            });

            restaurantNameAlreadyExists = restaurant != null;
        }

        this.setState(prevState => ({
            ...prevState,
            restaurantNameAlreadyExists: restaurantNameAlreadyExists,
            [target.name]: target.value
        }));
    }

    onFormSubmit(event) {
        event.preventDefault();
        const target = event.target;

        let allFieldsAnsweredOnSubmit = true;
        if (target.name.value === '' || target.location.value === '' || target.thumbnail.value === ''
            || target.thumbnailHeight.value == 0 || target.thumbnailWidth.value == 0) {
            allFieldsAnsweredOnSubmit = false;
        }

        this.setState({allFieldsAnsweredOnSubmit: allFieldsAnsweredOnSubmit});

        if (this.state.restaurantNameAlreadyExists) {
            return;
        }

        if (allFieldsAnsweredOnSubmit) {
            this.props.addRestaurant({
                name: target.name.value,
                location: target.location.value,
                thumbnail: target.thumbnail.value,
                thumbnailHeight: target.thumbnailHeight.value,
                thumbnailWidth: target.thumbnailWidth.value
            });

            this.props.history.push("/");
        }
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants.toList().toArray()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addRestaurant: restaurant => {
            dispatch(actions.addRestaurant(restaurant));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);
