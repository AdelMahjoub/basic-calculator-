import React from 'react';

export default function(props) {
    return (
        <input 
        className="btn"
        type="button" 
        value={props.value}
        onClick={props.handleClick}
        />
    )
}
