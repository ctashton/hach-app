import React, { Component } from 'react';
import axios from 'axios';

class AddRecipe extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            recipeName: '',
            recipeDescription: '',
            recipeAllergens: ''
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
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/postrecipe', {
            recipeName: this.state.recipeName,
            recipeDescription: this.state.recipeDescription,
            recipeAllergens: this.state.recipeAllergens,
            token: this.state.token
        }).then(res =>{
            console.log('successfully added recipe!')
            const loc = window.location.pathname
            const dir = loc.substring(0, loc.lastIndexOf('/'));
            window.location.pathname = dir + '/AddRecipe'
        })
    }

    render () {
        return (
            <div className="AddRecipe">
                <div className="column col-6 col-xs-12">
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <label htmlFor="recipeName">Enter Recipe Name:</label>
                        <input className="form-input"
                            id="recipeName"
                            name="recipeName"
                            type="text"
                            value={this.state.recipeName}
                            onChange={this.handleChange}
                        />
                        <div className="form-group">
                            <label htmlFor="recipeDescription">Enter Recipe Description:</label>
                            <textarea className="form-input"
                                rows="3"
                                id="recipeDescription"
                                name="recipeDescription"
                                type="text"
                                value={this.state.recipeDescription}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipeAllergens">Enter any common food allergies to be aware of:</label>
                            <input className="form-input"
                                id="recipeAllergens"
                                name="recipeAllergens"
                                type="text"
                                value={this.state.recipeAllergens}
                                onChange={this.handleChange}
                                />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}
export default AddRecipe;