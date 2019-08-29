import React, {Component} from 'react';
import ResultList from './ResultList';
import axios from 'axios';
// import chefs from '../../devChefData.json'

class FindAChef extends Component {
    constructor(props){
        super(props);
        this.state ={
            chefs: [],
            chefId: null
        };
    }

    handleChefId = chefId => {
        this.setState({chefId})
        console.log(this.state)
    }
    componentDidMount() {
        this.searchChefs();
        console.log(this.state)
    }
    searchChefs = () =>{
        axios.get('/allchefs')
        .then(res => {
            console.log("All chef data: " + JSON.stringify(res))
            let userdata = res.data

            // userdata.forEach(element => {
            //     axios.get('/chefinfo/' + userdata.id).then(results => {
            //         console.log(results)
            //     })
            // });
            this.setState({chefs: res.data})
            console.log("searchchef state: " + JSON.stringify(this.state.chefs))
        })
    }
    handleImageURL= (url) => {
        console.log("starting URL transformation for: " + url)
            let index = -24
            let newurl = url.slice(index)
            console.log(newurl)
            return newurl
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
                image={this.handleImageURL(chef.chefTable.chefProfilePictureURL)}
                handleChefId = {this.handleChefId}
                bio={chef.chefTable.chefBio}
            />
            ))} 
            </div>

        </div>
        )
    }
}

export default FindAChef
