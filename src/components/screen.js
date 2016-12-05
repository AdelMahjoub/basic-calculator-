import React from 'react';

export default function(props) {
    return (
        <div className="screen">
            <p className="inner-screen">{props.outPut}</p>
            <code className="error">{props.error}</code>
        </div>
    )
}