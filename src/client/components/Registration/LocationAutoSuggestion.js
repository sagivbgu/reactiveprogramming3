import React from 'react';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import actions from './actions';

const locations = ['Haifa', 'Tel Aviv', 'Jerusalem', 'Beer Sheva', 'Eilat'];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : locations.filter(location =>
        location.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// Render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

class LocationAutoSuggestion extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            suggestions: [],
            location: this.props.location || ''
        };
    }

    onChange = (event, {newValue}) => {
        this.props.changeLocation(newValue);
        this.props.onLocation(newValue);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const {suggestions, value} = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Start typing',
            value,
            onChange: this.onChange,
            disabled: this.props.disabled
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={value => value}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default LocationAutoSuggestion;

