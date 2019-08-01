import React, {Component} from 'react';
import Review from './Review.js';

class List extends Component {
    render()
    {
        return (
            <ul className="reviews__list">
                {this.props.reviews.map((review, index) => <Review key={index} index={index} review={review}/>)}
            </ul>
        );
    }
}

export default List;
