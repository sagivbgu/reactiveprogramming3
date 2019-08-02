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
import moment from "moment";

class Reviews extends Component {
    constructor() {
        super();

        this.ratingTopics = [
            "Bathroom Quality", "Staff Kindness", "Cleanliness", "Drive-thru quality",
            "Delivery Speed", "Food Quality"
        ];
        this.starsThresholds = [">1", ">2", ">3", ">4"];

        this.topicsGroup = {
            label: 'Topics',
            options: this.ratingTopics.map(topic => {
                return {label: topic, value: topic, isDisabled: false};
            })
        };
        this.starsThresholdsGroup = {
            label: 'Stars Threshold',
            options: this.starsThresholds.map(threshold => {
                return {label: threshold, value: threshold, isDisabled: false};
            }),
        };

        this.state = {
            form: {
                isFormActive: false,
                reviewText: '',
                ratings: Object.assign(...this.ratingTopics.map(topic => [topic, 0]).map(([k, v]) => ({[k]: v}))),
                validation: ''
            },

            selectedSortingOption: "Newest",

            choosedTopic: '',
            choosedThreshold: '',
            disabledGroups: new Set([]),
            filteringOptions: [this.topicsGroup, this.starsThresholdsGroup],
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.onSortingSelectChange = this.onSortingSelectChange.bind(this);
        this.onFilterSelectChange = this.onFilterSelectChange.bind(this);

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

    render() {
        let reviews = this.props.restaurants.get(this.props.restaurantId).reviews.toArray();
        return (
            <div>
                {this.renderSorting(reviews)}
                {this.renderFiltering(reviews)}

                <p>Reviews & Ratings:</p>
                {this.renderReviews(reviews)}

                <div className="review-form bg-white content-padding block-margin-top">
                    {this.renderForm()}
                    {this.showButton()}
                </div>
            </div>
        );
    }

    renderSorting(reviews) {
        let sorting_topics_options = Object.keys(this.state.form.ratings).map(topic => {
            return {label: topic}
        });

        let sorting_options = [
            {label: "Newest"},
            {label: "Oldest"},
            {label: "Since last week"},
            {label: "Since last month"},
            {label: "Since last year"}
        ].concat(sorting_topics_options);

        return (
            <div>
                <p>Sort reviews by:</p>
                <Select options={sorting_options}
                        placeholder={this.state.selectedSortingOption}
                        value={this.state.selectedSortingOption}
                        onChange={this.onSortingSelectChange}/>
            </div>
        );
    }

    renderFiltering(reviews) {
        return (
            <div>
                <p>Filter reviews by:</p>
                <Select
                    options={this.state.filteringOptions}
                    isMulti={true}
                    onChange={this.onFilterSelectChange}
                />
            </div>
        );
    }

    renderReviews(reviews) {
        reviews = this.sortReviews(this.filterReviews(reviews));
        return (
            <div className="">
                {reviews.length !== 0 ?
                    <List reviews={reviews}/> :
                    <p>No reviews.</p>}
            </div>
        )
    }

    renderForm() {
        return (
            <form className={this.state.form.isFormActive ? '' : 'hide'} onSubmit={this.submitForm}>
                {this.state.form.validation}

                <textarea name="reviewText"
                          value={this.state.form.reviewText}
                          placeholder="Write some text"
                          onChange={this.handleFormInputChange}/>

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
        );
    }

    onSortingSelectChange(selectedOption) {
        this.setState({
            selectedSortingOption: selectedOption.label
        })
    }

    onFilterSelectChange(selectedOptions) {
        let setDisabledElementOnGroup = (group, boolValue) => {
            boolValue ? this.state.disabledGroups.add(group) : this.state.disabledGroups.delete(group);
            group.options.forEach((elem, idx) => group.options[idx].isDisabled = boolValue)

            let topic = this.state.choosedTopic;
            let threshold = this.state.choosedThreshold;

            if (boolValue) {
                let lastSelected = selectedOptions.slice().pop();
                (this.topicsGroup == group) ? (topic = lastSelected.label) : (threshold = lastSelected.label);
            }

            this.setState({
                disabledGroups: this.state.disabledGroups,
                choosedTopic: topic,
                choosedThreshold: threshold
            });
        };

        let getLastSelectedOptionRelevantGroup = (selectedOptions) => {
            let lastSelectedOption = selectedOptions.slice().pop();
            return this.ratingTopics.includes(lastSelectedOption.label) ? this.topicsGroup : this.starsThresholdsGroup;
        };

        if (this.state.disabledGroups.size === 0) {
            // First selection
            let group = getLastSelectedOptionRelevantGroup(selectedOptions);
            setDisabledElementOnGroup(group, true);
        } else if (this.state.disabledGroups.size === 1) {
            if (selectedOptions == null) {
                // A filter was removed, now there is no selection at all.
                setDisabledElementOnGroup(this.state.disabledGroups.values().next().value, false);
            } else {
                // One more filter was added, now there are 2 selections.
                let group = getLastSelectedOptionRelevantGroup(selectedOptions);
                setDisabledElementOnGroup(group, true);
            }
        } else {
            // There was 2 selection, one of them was just removed.
            let group = getLastSelectedOptionRelevantGroup(selectedOptions);
            group = group == this.topicsGroup ? this.starsThresholdsGroup : this.topicsGroup;
            setDisabledElementOnGroup(group, false);
        }
    }

    sortReviews(reviews) {
        let sinceLastFilter = (x, amount, review) => {
            var today = new moment();
            return review.date - today.subtract(1, x).toDate() > 0;
        };

        switch (this.state.selectedSortingOption) {
            case "Newest":
                return reviews.sort((a, b) => b.date - a.date);
            case "Oldest":
                return reviews.sort((a, b) => a.date - b.date);
            case "Since last week":
                return reviews.filter(review => sinceLastFilter('day', 7, review));
            case "Since last month":
                return reviews.filter(review => sinceLastFilter('month', 1, review));
            case "Since last year":
                return reviews.filter(review => sinceLastFilter('year', 1, review));
            default:
                let compareTopics = (a, b, topic) => (b.ratings[topic] - a.ratings[topic]);
                return reviews.sort((a, b) => compareTopics(a, b, this.state.selectedSortingOption));
        }
    }

    filterReviews(reviews) {
        if (this.state.disabledGroups.size !== 2) return reviews;

        let threshold = parseInt(this.state.choosedThreshold.substr(1));
        return reviews.filter(review => review.ratings[this.state.choosedTopic] > threshold);
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
                    validation: <div className="validation">Please fill all the review details</div>
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

    handleFormInputChange(event) {
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
