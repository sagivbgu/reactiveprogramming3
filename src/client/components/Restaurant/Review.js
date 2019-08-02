import React, {Component} from 'react';
import Rating from "react-rating";
import emptystar from "./assets/images/star-empty.png"
import yellowstar from "./assets/images/star-yellow.png"

class Review extends Component {
    render() {
        let restaurantName = this.props.review.restaurantName;
        let reviewer = this.props.review.reviewerUsername;
        let reviewTitle = restaurantName ? `${restaurantName} - ${reviewer}'s review` : reviewer;
        return (
            <li key={this.props.index} className="reviews__list-item reset-list block-padding-vertical">
                <div className="review area">
                    <h3 className="review__title">{reviewTitle}</h3>

                    {this.getDate(this.props.review.date)}
                    <br/>

                    <ul className="reviews__list">
                        {
                            Object.keys(this.props.review.ratings).map((key, idx) => {
                                return (
                                    <li key={idx}> {key}: <Rating initialRating={this.props.review.ratings[key]}
                                                                  readonly={true}
                                                                  emptySymbol={<img src={emptystar} className="icon"/>}
                                                                  fullSymbol={<img src={yellowstar}
                                                                                   className="icon"/>}/>
                                    </li>)
                            })
                        }
                    </ul>

                    <div className="review__content">
                        {this.props.review.text}
                    </div>

                </div>
            </li>
        );
    }


    getDate(date) {
        if (typeof date === 'object') {
            return (
                <span className="review__date">
                    {date.toString()}
                </span>
            );
        }

    }
}

export default Review;
