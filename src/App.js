import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import List from "./component/List";
import Detail from "./component/Detail";
// import { getListAsync } from './ActionCreator';
// import { connect } from 'react-redux';

class App extends Component {
  // componentDidMount() {
  //   this.props.getListAsync()
  // }
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

// const mapDispatchToProps = dispatch => {
//   return {
//     getListAsync: () => {
//       dispatch(getListAsync())
//     }
//   }
// }
export default App;
// export default connect(undefined, mapDispatchToProps)(App);
