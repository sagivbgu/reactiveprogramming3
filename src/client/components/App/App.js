import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import './app.scss'

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.loggedUser ? <Redirect to="/home/"/> : <Redirect to="/login"/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state['app'].get('loggedUser')
    }
};

export default connect(mapStateToProps)(App);
