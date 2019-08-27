import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const containerStyle={
    padding: '2rem'
}

class Home extends Component {
    
    render() {
        return (
            <div>
                <div className="column">
                    <div className="hero bg-gray">
                        <div className="hero-body">
                            <h1>Hire a Chef!</h1>
                        </div>
                    </div>
                    <div className="container" style={containerStyle}>
                        <div className="columns">
                            <div className="column col-6">
                                <div className="tile">
                                <div className="tile-icon">
                                        <figure className="avatar avatar-lg flex-centered">
                                        <i className="icon icon-people centered"></i>
                                        </figure>
                                    </div>                                
                                    <div className="tile-content">
                                        <p className="tile-title">Be a guest in your own home! Hire a Chef today!</p>
                                        <p className="tile-subtitle">Sign up and search through a collection of local chef's, their menu's, and current availability!</p>
                                        <p>
                                        <Link to="/ClientSignUp">
                                        <button className="btn btn-lg, btn btn-primary">Client Sign Up</button>
                                        </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-6">
                            <div className="tile">
                                    <div className="tile-icon">
                                        <figure className="avatar avatar-lg flex-centered">
                                        <i className="icon icon-people centered"></i>
                                        </figure>
                                    </div>
                                    <div className="tile-content">
                                        <p className="tile-title">Become a Chef today!</p>
                                        <p className="tile-subtitle">Sign up to create your menu's, share your experience, and be found by locals to start working as your own mobile restaurant!</p>
                                        <p>
                                        <Link to="/ClientSignUp">
                                        <button className="btn btn-lg, btn btn-primary">Chef Sign Up</button> 
                                        </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    
    
        )
    }
    
}

export default Home;