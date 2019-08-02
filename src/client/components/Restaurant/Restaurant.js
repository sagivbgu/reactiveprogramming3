import React from "react";
import {connect} from 'react-redux';
import Reviews from "./Reviews";
import actions from "../Restaurants/actions";
import {Link} from "react-router-dom";


class Restaurant extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (null == this.props.restaurants[this.props.match.params.restaurantIndex]) {
            this.props.fetchAllRestaurants();
        }
    }

    render() {
        const restaurant = this.props.restaurants[this.props.match.params.restaurantIndex]
        if (null == restaurant) {
            return <div></div>
        }

        return (
            <div>
                <p>Welcome to {restaurant.name}, {restaurant.location}</p>
                <Reviews restaurantId={restaurant._id}/>
                <Link to="/home/">Back to home page</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants.toList().toArray()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllRestaurants: () => {
            dispatch(actions.fetchAllRestaurantsRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
