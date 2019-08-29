import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react';


class ResultList extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column col-6">
                <div className="card" style={{width: 220, margin: 20}}>
                <div className="card-image" style={{display: 'block', padding: 10}}>
                    <Image cloudName="hmjzq8uot" publicId={this.props.image}>
                    <Transformation width="200" height="200" gravity="face" radius="max" crop="crop" />
                    </Image>
                </div>
                <div className="card-header">
                    <div className="card-title h5">{this.props.name}</div>
                    <div className="card-subtitle text-gray">{this.props.rating}</div>
                </div>
                <div className="card-body">
                    {this.props.bio}
                </div>
                <div className="card-footer">
                    <Link to={"/viewprofile/" + this.props.id}>
                    <button className="btn btn-primary">View Profile</button>
                    </Link>
                </div>
            </div>

                </div>
            </div>
        )    
    }
    
}

export default ResultList