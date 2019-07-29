import React, {Component} from 'react';
import Rating from "react-rating";
import emptystar from "./assets/images/star-empty.png"
import yellowstar from "./assets/images/star-yellow.png"

class Review extends Component {
    render() {
        let c = {"Bathroom Quality": 1, "Staff Kindness": 4, "Cleanliness": 1}


        return (
            <li key={this.props.index} className="reviews__list-item reset-list block-padding-vertical">
                <div className="review area">
                    <h3 className="review__title">{this.props.review.name}</h3>

                    {this.getDate(this.props.review.date)}
                    <br/>

                    <ul className="reviews__list">
                        {
                            Object.keys(c).map(key => {
                                return (
                                    <li> {key}: <Rating initialRating={c[key]}
                                                        emptySymbol={<img src={emptystar} className="icon"/>}
                                                        fullSymbol={<img src={yellowstar} className="icon"/>}/>
                                    </li>)
                            })
                        }
                    </ul>

                    <div className="review__content">
                        {this.props.review.review}
                    </div>

                </div>
            </li>
        );
    }

    getDate(date) {
        if (typeof date === 'object') {
            return (
                <span className="review__date">
                    {date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}
                </span>
            );
        }

    }
}

export default Review;
