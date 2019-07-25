import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import AppActions from './actions';
import Login from "../Registration/Login";

class App extends React.Component {
  render() {
    return (
      <div>
          <Login/>
      </div>
    );
  }
}

// TODO: Change mapXXXToProps
const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
