import React, {Component} from 'react';
import List from './List.js';
import './css/style.min.css';
import Rating from "react-rating";
import emptystar from "./assets/images/star-empty.png";
import yellowstar from "./assets/images/star-yellow.png";
import Button from "./Button";
import {connect} from "react-redux";
import actions from "../Restaurants/actions";
import Select from "react-select"

class Reviews extends Component {
    constructor() {
        super();

        this.state = {
            selectedOption: "Newest",
            form: {
                isFormActive: false,
                reviewText: '',
                ratings: {
                    "Bathroom Quality": 0,
                    "Staff Kindness": 0,
                    "Cleanliness": 0,
                    "Drive-thru quality": 0,
                    "Delivery Speed": 0,
                    "Food Quality": 0
                },

                // TODO:
                pictures: [],

                validation: ''
            }
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.selectOnChange = this.selectOnChange.bind(this);

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

    selectOnChange(selectedOption) {
        this.setState({
            selectedOption: selectedOption.label
        })
    }

    render() {
        let reviews = this.props.restaurants.get(this.props.restaurantId).reviews.toArray();

        let sorting_topics_options = Object.keys(this.state.form.ratings).map(topic => {
            return {label: topic}
        });

        let sorting_options = [
            {label: "Newest"},
            {label: "Oldest"}
        ].concat(sorting_topics_options);

        console.log(sorting_topics_options);
        console.log(sorting_options);

        return (
            <div className="">

                {reviews.length !== 0 && <p>Sort reviews by:</p>}
                {reviews.length !== 0 && < Select options={sorting_options}
                                                  value={this.state.selectedOption}
                                                  onChange={this.selectOnChange}/>}


                <div className="">
                    <p>Reviews & Ratings:</p>
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

    sortReviewsBySelectedOption(reviews) {
        let compareTopics = (a, b, topic) => (b.ratings[topic] - a.ratings[topic]);

        if (this.state.selectedOption === "Newest") return reviews.sort((a, b) => b.date - a.date);
        if (this.state.selectedOption === "Oldest") return reviews.sort((a, b) => a.date - b.date);

        return reviews.sort((a, b) => compareTopics(a, b, this.state.selectedOption));
    }

    renderList() {
        let reviews = this.props.restaurants.get(this.props.restaurantId).reviews.toArray();
        reviews = this.sortReviewsBySelectedOption(reviews);

        return (
            <div className="">
                {reviews.length !== 0 ?
                    <List reviews={reviews}/> :
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
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
