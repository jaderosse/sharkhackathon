import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Flash from './layout/Flash.js';
import Footer from './layout/Footer.js';
import Home from './Home.js';
import Nav from './layout/Nav.js';
import Login from './auth/Login.js';
import Profile from './Profile.js';
import Signup from './auth/Signup.js';
import AddDogForm from './AddDogForm';
import DogFormTwo from './layout/DogFormTwo';
import CardForm from './CardForm';
import CardSum from './CardSum';
import Finish from './Finish';
import AddressForm from './addressform';
import Header from './Header.js';
import Cloud from './Cloud';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      url: ''
    }
  }
  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // If there is a token in localStorage
    let token = localStorage.getItem('mernToken');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      });
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token);
        this.setState({
          token: response.data.token,
          user: response.data.user
        });
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null
        });
      })
    }
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }

  setUrl = (petUrl) => {
    this.setState({url: petUrl})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            {/*<Nav user={this.state.user} updateUser={this.getUser} />*/}
            <div className="space">
              <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
              {/*<Route exact path="/home" component={Home} />*/}
              <Route exact path="/login" component={
                () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              {/*<Route exact path="/profile" component={
                () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />*/}
              <Route exact path="/adddog" component={
                () => (<AddDogForm user={this.state.user} url={this.props.url} setFlash={this.setFlash} />)} />
              <Route exact path="/funform" component={
                () => (<DogFormTwo user={this.state.user} setFlash={this.setFlash} />)} />
              <Route exact path="/cardform" component={
                () => (<CardForm user={this.state.user} setFlash={this.setFlash} />)} />
              <Route exact path="/cardsum" component={
                () => (<CardSum user={this.state.user} setFlash={this.setFlash} />)} />
              <Route exact path="/finish" component={
                () => (<Finish user={this.state.user} setFlash={this.setFlash} />)} />
              <Route exact path="/addressform" component={
                () => (<AddressForm user={this.state.user} setFlash={this.setFlash} />)} />
              <Route exact path="/" component={
                () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
            </div>
          </div>
        </Router>
        {/*<Footer />*/}
      </div>
    );
  }
}

export default App;
