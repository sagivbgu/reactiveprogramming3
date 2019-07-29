import React from "react";
import {connect} from 'react-redux';
import Gallery from 'react-grid-gallery';
import history from '../../history'
import Reviews from "./Reviews";
import Restaurants from "../Restaurants/Restaurants";

const divStyle = {
    margin: "auto",
    width: "80%",
    border: "3px solid white",
    padding: "10px",
};


class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {};
    }

    render() {
        const restaurant = this.props.restaurants[this.props.match.params.rest_id]

        return (
            <div>
                <Reviews name={restaurant.name} location={restaurant.location}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants.get('restaurants').toArray()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
