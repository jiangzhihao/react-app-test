import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import List from "./component/List";
import Detail from "./component/Detail";
import { getListAsync } from './ActionCreator';
import {connect} from 'react-redux';

class App extends Component {
  componentWillMount() {
    this.props.getListAsync()
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/list/:page" component={List} />
          <Route path="/detail/:id" component={Detail} />
          <Redirect from="/" to="/list/1" />
        </Switch>
      </Router>
    );
  }
}

// export default App;
const mapDispatchToProps = dispatch => {
  return {
    getListAsync: page => {
      dispatch(getListAsync(page));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(App);
