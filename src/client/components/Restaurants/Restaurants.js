import React from "react";
import {connect} from 'react-redux';
import Gallery from 'react-grid-gallery';

const divStyle = {
    margin: "auto",
    width: "80%",
    border: "3px solid white",
    padding: "10px",
};


class Restaurants extends React.Component {
    constructor(props) {
        super(props);

        this.onClickThumbnail = this.onClickThumbnail.bind(this);
        //this.state = {};

    }

    onClickThumbnail(index, event) {
        this.props.history.push('/restaurants/' + index)
    }

    render() {
        return (
            <div>
                <h1>Restaurants</h1>
                <Gallery images={this.props.restaurants}
                         enableImageSelection={false}
                         margin={50}
                         onClickThumbnail={this.onClickThumbnail}
                />
            </div>
        );
    }
}

// TODO: 2
const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants.get('restaurants').toArray()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
