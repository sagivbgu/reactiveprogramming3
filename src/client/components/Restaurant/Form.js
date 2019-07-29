import React, {Component} from 'react';
import Button from './Button.js';
import Star from './Star.js';
import Rating from "react-rating";
import emptystar from "./assets/images/star-empty.png";
import yellowstar from "./assets/images/star-yellow.png";

class Form extends Component {
    constructor() {
        super();

        this.state = {
            isActive: false,
            isSubmitted: false,
            name: '',
            review: '',
            ratingTopics: {
                "Bathroom Quality": 0,
                "Staff Kindness": 0,
                "Cleanliness": 0,
                "Drive-thru quality": 0,
                "Delivery Speed": 0,
                "Food Quality": 0,
            },
            // TODO:
            pictures: []
        };

        this.onChanges = {}
        Object.keys(this.state.ratingTopics).forEach(key => {
            let onChange = value => {
                this.setState(prevState => ({
                    ratingTopics: {
                        ...prevState.ratingTopics,
                        [key]: value
                    }
                }))
            }
            this.onChanges[key] = onChange.bind(this)
        })

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        console.log(this.state.ratingTopics)
        return (
            <div className="review-form bg-white content-padding block-margin-top">

                <form className={this.state.isActive ? '' : 'hide'} onSubmit={this.props.submitForm}>

                    {this.props.validation}
                    <input type="hidden" name="ratingTopics" value={this.state.ratingTopics}/>

                    <input type="text" value={this.state.name} name="name" placeholder="Name"
                           onChange={this.handleInputChange}/>

                    <textarea name="review" value={this.state.review} placeholder="Write some text"
                              onChange={this.handleInputChange}/>

                    <ul className="reviews__list">
                        {
                            Object.keys(this.state.ratingTopics).map(key => {
                                return (
                                    <li> {key}: <Rating initialRating={this.state.ratingTopics[key]}
                                                        emptySymbol={<img src={emptystar} className="icon"/>}
                                                        fullSymbol={<img src={yellowstar} className="icon"/>}
                                                        onChange={this.onChanges[key]}/>
                                    </li>)
                            })
                        }
                    </ul>

                    <button className="button">Submit</button>
                </form>

                {this.showButton()}

            </div>
        )
    }

    showForm() {
        this.setState({...this.state, isActive: true});
    }

    showButton() {
        return <Button isActive={this.state.isActive} showForm={() => this.showForm()}/>;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({...this.state, [name]: value})
    }
}

export default Form;
