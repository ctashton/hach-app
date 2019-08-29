import React, { Component } from 'react';
import axios from 'axios';
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react';
import RecipeResults from './RecipeResults';

class ViewProfile extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            chef: [],
            recipes: [],
            image: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value });
      }

    componentDidMount() {
        let url = window.location.href.toString()
        console.log("url: " + url)
        let user = url.substring(url.lastIndexOf("/") + 1, url.length)
        console.log("user: " + user)
        this.setState({user: user})
        this.searchChefs();
        console.log(this.state)
    }
    
    searchChefs = () => {
        let url = window.location.href.toString()
        let user = url.substring(url.lastIndexOf("/") + 1, url.length)
        let geturl = '/chefprofile/' + user
        console.log(geturl)
        axios.get(geturl)
        .then(res => {
            this.setState({chef: res.data})
            console.log(this.state)
            console.log(this.state.chef.chefTable.chefProfilePictureURL)
            this.handleImageURL(this.state.chef.chefTable.chefProfilePictureURL)
        })
        let recipeurl = '/myrecipes/' + user
        axios.get(recipeurl)
        .then(res => {
            console.log(res)
            this.setState({recipes: res.data})
        })

    }
    handleImageURL= (url) => {
        console.log("starting URL transformation for: " + url)
            let index = -24
            let newurl = url.slice(index)
            console.log(newurl)
            this.setState({image: newurl})
            console.log("post url change: " + JSON.stringify(this.state))
        }


    render() {

        return (
            <div className="container">
                <div className="columns">
                    <div className="col-4">
                        <h1>{this.state.chef.userFirstName} {this.state.chef.userLastName}</h1>
                        <Image cloudName="hmjzq8uot" publicId={this.state.image}>
                    <Transformation width="200" height="200" gravity="face" radius="max" crop="crop" />
                    </Image>
                    </div>
                                <div>
                    <h1>My Recipes</h1>

            {this.state.recipes.map(recipes=> (
                <RecipeResults 
                key={recipes.id}
                id={recipes.id}
                name={recipes.recipeName}
                description={recipes.recipeDescription}
                allergens={recipes.recipeAllergens}
            />
            ))} 
            </div>
                </div>
            </div>
        )
    }
}


export default ViewProfile