import React, { Component } from 'react';
import ResultList from './ResultList';
import axios from 'axios'
import pork from "../../utilities/images/egg.jpg"
// import { url } from 'inspector';


const bgImage = {
    backgroundImage: `url('https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80')`,
    backgroundSize: "cover",
    height: '400px'
}

class FindAMeal extends Component {

    constructor() {
        super();
        this.state = {
            zipcode: "32806",
            recipes: []
        };
    }
    componentDidMount() {
        this.searchMeals();
        console.log(this.state)
    }

    searchMeals = () =>{
        axios.get('/allrecipes')
        .then(res => {
            console.log(res)
            this.setState({recipes: res.data})
        })
    }

    render() {
        return (
            <div className="container">
                <div className="hero" style={bgImage}>
                    <div className="hero-body" >
                        <h1>Featured Meal: Delicious Pork</h1>
                    </div>
                </div>
                <div className="columns">
                    {this.state.recipes.map(recipes=> (
                <ResultList
                key={recipes.id}
                id={recipes.id}
                name={recipes.recipeName}
                description={recipes.recipeDescription}
                allergens={recipes.recipeAllergens}
            />
            ))}                     
                    {/* <div className="empty-icon">
                        <i className="icon icon-people"></i>
                    </div> */}
                    {/* <p className="empty-title h5">There's no chef's in your area</p> */}
                </div>
            </div>
        )
    }
}

export default FindAMeal