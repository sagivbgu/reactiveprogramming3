import React, {Component} from 'react';
import List from './List.js';
import Form from './Form.js';
import './css/style.min.css';

class Reviews extends Component {
    constructor() {
        super();

        this.state = {
            reviews: [
                {
                    rating: 3,
                    name: 'Danny van Holten',
                    review: 'Curabitur blandit mollis lacus. Curabitur suscipit suscipit tellus. Phasellus tempus.\n\n Quisque rutrum. Nulla sit amet est. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.',
                    date: new Date(new Date().setDate(new Date().getDate() - 10))
                },
                {
                    rating: 4,
                    name: 'Max Verstappen',
                    review: 'Curabitur blandit mollis lacus. Curabitur suscipit suscipit tellus. Phasellus tempus.\n\n Quisque rutrum. Nulla sit amet est. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.',
                    date: new Date()
                }
            ],
            validation: ''
        };

        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        this.setState({
            ...this.state, averageRating: this.getAverageRating(this.state.reviews)
        });
    }

    render() {
        return (

            <div className="row align-center">
                <div className="small-12 medium-8 large-6 columns">
                    <div className="content-padding bg-white area">

                        <p className="font-size-medium">
                            Welcome to {this.props.name}, {this.props.location}
                        </p>
                        <p>Reviews & Ratings:</p>

                        {this.renderList()}

                    </div>
                    {this.renderForm()}
                </div>
            </div>
        );
    }

    renderList() {
        return <List reviews={this.state.reviews}/>;
    }

    renderForm() {
        return <Form submitForm={this.submitForm} validation={this.state.validation}/>;
    }

    submitForm(event) {
        event.preventDefault();
        const reviews = this.state.reviews.slice();

        let allRatingsAnswered = Object.keys(event.target.ratingTopics.value).map(key => {
            console.log(key + ' ' + event.target.ratingTopics.value[key])
            return event.target.ratingTopics.value[key] == 0 }
        ).length == 0

        if (!allRatingsAnswered || event.target.name.value === '' || event.target.review.value === '') {
            this.setState({
                ...this.state,
                validation: <div className="validation">Error</div>
            });
            return;
        }
        this.setState({
            ...this.state,
            validation: ''
        });
        reviews.push({
            rating: parseInt(event.target.rating.value),
            name: event.target.name.value,
            review: event.target.review.value,
            date: new Date()
        });
        this.setState({
            ...this.state,
            reviews: reviews,
            averageRating: this.getAverageRating(reviews),
            validation: ''
        });
    }

    getAverageRating(reviews) {
        var totalRating = 0;
        reviews.map(function (review) {
            totalRating = totalRating + review.rating;
        });
        return Math.round(totalRating / reviews.length * 2 * 10) / 10;
    }
}

export default Reviews;