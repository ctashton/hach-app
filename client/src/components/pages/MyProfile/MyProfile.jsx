import React, { Component } from "react";
import axios from 'axios'
// import { Redirect } from 'react-router-dom';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      chefQualifications: '',
      chefBio: '',
      chefLocation: '',
      chefRate: '',
      selectedFile: null,
      phone: '',
      isChef: false

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChef = this.handleChef.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  handleChef() {
    if (this.state.isChef === false) {
      this.setState({ isChef: true })
    } else {
      this.setState({ isChef: false })
    }
  }
  fileChangedHandler = (event) => {
    const file = event.target.files[0]
    this.setState({ selectedFile: file })
  }

  uploadHandler = () => { console.log(this.state.selectedFile) }

  componentDidMount() {
    let key = localStorage.getItem('token')
    this.setState({ token: key })
    axios.get(`/me/` + key).then(res => {
      if (res.data.isChef === true) {
        this.setState({ isChef: true })
      }
      console.log(this.state)
    })

  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedFile)
    const formData = new FormData()
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1].name);
    }

    // axios.post(`/editprofile`, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     file: this.state.selectedFile,
    //     token: this.state.token
    // }, {
    //     onUploadProgress: progressEvent => {
    //         console.log(progressEvent.loaded / progressEvent.total)
    //       }
    // })



    // axios.post(`/register`, {
    //   userFirstName: this.state.firstname,
    //   userLastName: this.state.lastname,
    //   userPhone: this.state.phone,
    //   email: this.state.email,
    //   username: this.state.username,
    //   password: this.state.password,
    //   isChef: this.state.isChef
    // }).then(res => {
    //   localStorage.setItem('token', res.data.authToken.token)
    //   const loc = window.location.pathname
    //   const dir = loc.substring(0, loc.lastIndexOf('/'));
    //   window.location.pathname = dir + '/FindAMeal'
    // this.setState({redirect: true})
    // this.renderRedirect();
    // })
  };
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to="/Login" />
  //   }
  // }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/FindAMeal" />
    // } else
    return (
      <div className="MyProfile">
        <form className="form-group" action={"/upload/" + this.state.token} encType="multipart/form-data" method="POST">
          <div className="form-group">
            <label htmlFor="image">Upload a Profile Picture:</label>
            <div>
              <input type="file" name="image" onChange={this.fileChangedHandler} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="chefQualifications">Select Your Experience:</label>
            <select className="form-select"
              id="chefQualifications"
              name="chefQualifications"
              type="text"
              value={this.state.chefQualifications}
              onChange={this.handleChange}
            >
              <option defaultValue disabled>Choose an option</option>
              <option>Homemade Recipes</option>
              <option>Rookie Chef</option>
              <option>Veteran Chef</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="chefBio">Enter a Brief Biography:</label>
            <textarea className="form-input"
              rows="3"
              id="chefBio"
              name="chefBio"
              type="text"
              value={this.state.chefBio}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="chefRate">Price Range: $-$$$$</label>
            <select className="form-select"
              id="chefRate"
              name="chefRate"
              type="text"
              value={this.state.chefRate}
              onChange={this.handleChange}
            >
              <option defaultValue disabled>Choose an option</option>
              <option>$</option>
              <option>$$</option>
              <option>$$$</option>
              <option>$$$$</option>
            </select>
          </div>
          <div>
            <button type="submit">Create Profile!</button>
          </div>
        </form>
      </div>
      //   <div className="ClientSignUp">
      //     <div className="column col-4 col-xs-12">
      //       <form className="form-group" onSubmit={this.handleSubmit}>
      //         <label htmlFor="firstName">Enter your First Name: </label>
      //         <input
      //           class="form-input"
      //           id="firstname"
      //           name="firstname"
      //           type="text"
      //           value={this.state.firstname}
      //           onChange={this.handleChange}
      //         />
      //         <div className="form-group">
      //         <label htmlFor="lastName">Enter your Last Name: </label>
      //         <input
      //           class="form-input"
      //           id="lastname"
      //           name="lastname"
      //           type="text"
      //           value={this.state.lastname}
      //           onChange={this.handleChange}
      //         />

      //         </div>
      //         <div className="form-group">
      //         <label htmlFor="phoneNumber">Enter your Phone Number: </label>
      //         <input
      //           class="form-input"
      //           id="phone"
      //           name="phone"
      //           type="number"
      //           value={this.state.phone}
      //           onChange={this.handleChange}
      //         />
      //         </div>
      //         <div className="form-group">
      //         <label htmlFor="email">Enter your email: </label>
      //         <input
      //           class="form-input"
      //           id="email"
      //           name="email"
      //           type="email"
      //           value={this.state.email}
      //           onChange={this.handleChange}
      //         />
      //         </div>
      //         <div className="form-group">
      //         <label htmlFor="username">Enter your username: </label>
      //         <input
      //           class="form-input"
      //           id="username"
      //           name="username"
      //           type="text"
      //           value={this.state.username}
      //           onChange={this.handleChange}
      //         />
      //         </div>
      //         <div className="form-group">
      //         <label htmlFor="password">Enter your password: </label>
      //         <input
      //           class="form-input"
      //           id="password"
      //           name="password"
      //           type="password"
      //           value={this.state.password}
      //           onChange={this.handleChange}
      //         />
      //         </div>
      //         <label className="form-switch">
      //           <input id="isChef" type="checkbox" name="isChef" onChange={this.handleChef} />
      //           <i className="form-icon"></i> Are you a chef?
      //           </label>
      //         <button type="submit">Submit</button>
      //       </form>

      //     </div>
      //   </div>
    );

  }
}

export default MyProfile;