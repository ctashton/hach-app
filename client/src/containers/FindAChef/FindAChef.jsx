import React, {Component} from 'react';
import ResultList from './ResultList';
import axios from 'axios';
// import chefs from '../../devChefData.json'

class FindAChef extends Component {
    constructor(){
        super();
        this.state ={
            //dummy data imported
            chefs: []
        };
    }

    componentDidMount() {
        this.searchChefs();
        console.log(this.state)
    }
    searchChefs = () =>{
        axios.get('/allchefs')
        .then(res => {
            console.log(res.data)
            this.setState({chefs: res.data})
            console.log(this.state)
        })
    }
    render() {
        return (        
        <div className="container">
            <div className="columns">
                <div className="col-2">
                <h1>Local Chefs</h1>
                </div>
                <div className="col-2 my-2 mx-4">
                <input type="text" className="input" placeholder="Search..." />
                </div>
            </div>
            <div className="columns">
            {this.state.chefs.map(chef=> (
                <ResultList 
                key={chef.id}
                id={chef.id}
                name={chef.userFirstName}
                rating={chef.rating}
                image={chef.image}
            />
            ))} 
            </div>

        </div>
        )
    }
}

export default FindAChef
