import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-calendar/dist/Calendar.css';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import DeleteAccount from './components/DeleteAccount';
import NavbarComponent from './components/Navbar';
import Orders from './components/Orders';
import PriceTable from './components/PriceTable';
import DeleteRecords from './components/DeleteRecords';
import item from "./components/item";
import itemsTable from "./components/itemsTable";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './configure-store';
import { Container } from './counter/container';
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'


class RouterNavigationSample extends React.Component {
  
  const 

  render() {
    return (
      <Router>
        <div className="container">
          <>
            <Route
              exact
              path="/"
              render={props => <LoginForm {...props} />} />

            <Route path="/Signup" render={props => <SignUp {...props} />} />
            <Route path="/Navbar" render={props => <NavigationBar {...props} />} />
            <Route path="/DeleteAccount" render={props => <DeleteAccount {...props} />} />
            <Route path="/Home" render={props => <HomePage {...props} />} />
            <Route path="/items" render={props => <itemsTable {...props} />} />
            <Route path="/item" render={props => <item {...props} />} />
            <Route path="/PriceTable" render={props => <PriceTable {...props} />} />
            <Route path="/Order" render={props => <Orders {...props} />} />
            <Route path="/Delete" render={props => <DeleteRecords {...props} />} />
          </>
        </div>
      </Router>
    );
  }
}


const App = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)


ReactDOM.render(<App />, document.getElementById('root'));

