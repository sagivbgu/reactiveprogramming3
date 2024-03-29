import React from "react";
import {connect} from 'react-redux';
import Gallery from 'react-grid-gallery';
import actions from "../Restaurants/actions";

class Restaurants extends React.Component {
    constructor(props) {
        super(props);

        this.onClickThumbnail = this.onClickThumbnail.bind(this);
        //this.state = {};

    }

    componentWillMount() {
        this.props.fetchAllRestaurants();
    }

    onClickThumbnail(index, event) {
        this.props.history.push('/restaurants/' + index)
    }

    render() {
        return (
            <Gallery images={this.props.restaurants}
                     enableImageSelection={false}
                     margin={50}
                     onClickThumbnail={this.onClickThumbnail}
            />
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
