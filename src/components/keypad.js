import React from 'react';
import BtnRow from './btn-row';

export default function(props) {
    const BtnValues = [
        [7, 8, 9, '÷', 'C'],
        [4, 5, 6, '×', '(', ')'],
        [1, 2, 3, '-', 'x²', '√'],
        [0, ".", "%", '+', '=']
    ];
    return(
        <div>
        <table>
            <tbody>
                {
                    BtnValues.map( arr => {
                        return (
                            <BtnRow 
                            key={arr[0]} 
                            rowBtnValues={arr} 
                            handleClick={props.handleClick}
                            />
                        )
                    })
                }
            </tbody>
        </table>
        </div>
    )
}