import React from 'react';

function ResultList(props) {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title h5">{props.name}</div>
            </div>
            <div className="card-body">
                Description: {props.description}
                <div>
                Allergies: {props.allergens}
                </div>

            </div>
            <div className="card-footer">
                <button className="btn btn-primary">Book this Recipe</button>
            </div>
        </div>
    )
}

export default ResultList