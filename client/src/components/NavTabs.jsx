import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const navStyle = {
    padding: '1rem'
}

class NavTabs extends React.Component {


    constructor() {
        super();
        this.state = {
          user: false,
          chef: false
        };
      }

      componentDidMount() {
        if(localStorage.getItem('token') === null){
          this.setState({ user: false })
        } else { 
            let key = localStorage.getItem('token')
          this.setState({ user: true })
          Axios.get(`/me/` + key).then(res => {
              if(res.data.isChef === true){
                  this.setState({ chef: true})
              }
              console.log(this.state)
          })
            
        }
        }
        
        logout() {
                localStorage.removeItem('token');
                this.setState({ user: false, chef: false})
        }

    render () {
        if (this.state.user === true && this.state.chef === true){
            return (
                <header className="navbar" style={navStyle}>
                <section className="navbar-section">
                    <Link to="/" className="navbar-brand mr-2">HachApp</Link>
                </section>
                <section className="navbar-section">
                    <Link to="/" className="btn btn-link">Home</Link>
                    <Link to="/FindAChef" className="btn btn-link">Find A Chef</Link> 
                    <Link to="/FindAMeal" className="btn btn-link">Find A Meal</Link>
                    <Link to ="/BookNew" className="btn btn-link">New Booking</Link>
                    <Link to="/tempGeoLocation" className="btn btn-link">tempGeo</Link>
                    <Link to="/AddRecipe" className="btn btn-link">Add Recipe</Link>
                    <Link to="/MyRecipes" className="btn btn-link">My Recipes</Link>
                    <Link to="/EditProfile" className="btn btn-link">Edit Profile</Link>
                    <Link to="/" className="btn btn-link" onClick={() => {this.logout()}}>Logout</Link>
                </section>
            </header>

            )
        }
        else if (this.state.user === true && this.state.chef === false) {
            return (
                <header className="navbar " style={navStyle}>
                    <section className="navbar-section">
                        <Link to="/" className="navbar-brand mr-2">HachApp</Link>
                    </section>
                    <section className="navbar-section">
                        <Link to="/" className="btn btn-link">Home</Link>
                        <Link to="/FindAChef" className="btn btn-link">Find A Chef</Link> 
                        <Link to="/FindAMeal" className="btn btn-link">Find A Meal</Link>
                        <Link to ="/BookNew" className="btn btn-link">New Booking</Link>
                        <Link to="/tempGeoLocation" className="btn btn-link">tempGeo</Link>
                        <Link to="/" className="btn btn-link" onClick={() => {this.logout()}}>Logout</Link>
                    </section>
                </header>
                )        
        }
        else {
            return (
                <header className="navbar" style={navStyle}>
                <section className="navbar-section">
                    <Link to="/" className="navbar-brand mr-2">HachApp</Link>
                </section>
                <section className="navbar-section">
                    <Link to="/" className="btn btn-link">Home</Link>
                    <Link to="/ClientSignUp" className="btn btn-link">Sign Up</Link>
                    <Link to="/Login" className="btn btn-link">Login</Link>
                </section>
            </header>
            )
        }
    }

    
}

export default NavTabs