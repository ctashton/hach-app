import React, { Component } from 'react';
import axios from 'axios';
import RecipeResults from './RecipeResults'

class MyRecipes extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            recipes: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value });
      }

    componentDidMount() {
        let key = localStorage.getItem('token')
        this.setState({token: key})
        axios.get('/me/' + key)
            .then(res => {
                console.log(res.data.id)
                const user = res.data.id
                axios.get('/myrecipes/' + user).then(recipes=> {
                    console.log(recipes.data)
                    this.setState({recipes: recipes.data})
                })
            })

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (        
        <div className="container">
            <h1>My Recipes</h1>
            <div className="columns">
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
        )
    }

}

export default MyRecipes