import React, { Component } from "react";
import axios from 'axios'

class ClientSignUp extends Component { 
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        username: '',
        password: ''
      };
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    handleChange(event) {
      const {name, value} = event.target
      this.setState({ [name]: value });
    }
    handleSubmit(event) {
      event.preventDefault();
      axios.post(`/register`, {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }).then(res => console.log(res))
        
      console.log(this.state.email)
      console.log(this.state.username)
      console.log(this.state.password)
  
    };
  
    render(){
      return (
        <div className="ChefSignUp">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="email">Enter your email: </label>
              <input
                id="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="username">Enter your username: </label>
              <input
                id="username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Enter your password: </label>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </form>
        </div>
      );
    
    }
  }
  
  export default ClientSignUp;