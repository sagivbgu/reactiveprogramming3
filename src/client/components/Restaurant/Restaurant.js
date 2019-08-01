import React from "react";
import {connect} from 'react-redux';
import Reviews from "./Reviews";


class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {};
    }

    render() {
        const restaurant = this.props.restaurants[this.props.match.params.restaurantIndex]

        return (
            <div>
                <p>Welcome to {restaurant.name}, {restaurant.location}</p>
                <Reviews restaurantId={restaurant._id}/>
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
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
