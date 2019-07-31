import React, {Component} from 'react';
import List from './List.js';
import './css/style.min.css';
import Rating from "react-rating";
import emptystar from "./assets/images/star-empty.png";
import yellowstar from "./assets/images/star-yellow.png";
import Button from "./Button";
import {connect} from "react-redux";
import actions from "../Restaurants/actions";

class Reviews extends Component {
    constructor() {
        super();

        this.state = {
            form: {
                isFormActive: false,
                reviewText: '',
                ratings: {
                    "Bathroom Quality": 0,
                    "Staff Kindness": 0,
                },

                // TODO:
                pictures: [],

                validation: ''
            }
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.onChanges = {};
        Object.keys(this.state.form.ratings).forEach(key => {
            let onChange = value => {
                this.setState(prevState => ({
                    form: {
                        ...prevState.form,
                        ratings: {
                            ...prevState.form.ratings,
                            [key]: value
                        }
                    }
                }))
            };
            this.onChanges[key] = onChange.bind(this)
        })
    }

    componentWillMount() {
        //this.props.getRestaurantReviews(this.props.restaurantId);
    }

    render() {
        return (
            <div className="">
                <div className="">
                    {this.renderList()}

                    <div className="review-form bg-white content-padding block-margin-top">

                        <form className={this.state.form.isFormActive ? '' : 'hide'} onSubmit={this.submitForm}>

                            {this.state.form.validation}

                            <textarea name="reviewText"
                                      value={this.state.form.reviewText}
                                      placeholder="Write some text"
                                      onChange={this.handleInputChange}/>

                            <ul className="reviews__list">
                                {
                                    Object.keys(this.state.form.ratings).map((key, idx) => {
                                        return (
                                            <li key={idx}> {key}: <Rating initialRating={this.state.form.ratings[key]}
                                                                          emptySymbol={<img src={emptystar}
                                                                                            className="icon"/>}
                                                                          fullSymbol={<img src={yellowstar}
                                                                                           className="icon"/>}
                                                                          onChange={this.onChanges[key]}/>
                                            </li>)
                                    })
                                }
                            </ul>

                            <button className="button">Submit</button>
                        </form>

                        {this.showButton()}

                    </div>

                </div>
            </div>
        );
    }

    renderList() {
        return (
            <div className="">
                {this.props.restaurants.get(this.props.restaurantId).reviews.toArray().length !== 0 ?
                    <List reviews={this.props.restaurants.get(this.props.restaurantId).reviews.toArray()}/> :
                    <p>No reviews yet.</p>}
            </div>
        )
    }

    submitForm(event) {
        event.preventDefault();

        let allRatingsAnswered = Object.keys(this.state.form.ratings).filter(key => {
                return this.state.form.ratings[key] === 0
            }
        ).length === 0;

        if (!allRatingsAnswered || event.target.reviewText.value === '') {
            this.setState(prevState => ({
                form: {
                    ...prevState.form,
                    validation: <div className="validation">Error</div>
                }
            }));
            return;
        }

        this.setState(prevState => ({
            form: {
                ...prevState.form,
                validation: ''
            }
        }));

        this.props.addReview({
            restaurantId: this.props.restaurantId,
            reviewerUsername: this.props.loggedUser,
            text: event.target.reviewText.value,
            date: new Date(),
            ratings: this.state.form.ratings
        });
    }

    showForm() {
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                isFormActive: true
            }
        }));
    }

    showButton() {
        return <Button isActive={this.state.form.isFormActive} showForm={() => this.showForm()}/>;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants,
        loggedUser: state.app.get('loggedUser')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addReview: review => {
            dispatch(actions.addReview(review));
        },

        getRestaurantReviews: (restaurantId) => {
            dispatch(actions.getRestaurantReviews(restaurantId))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
