import React from 'react';
import Btn from './button';

export default function(props){
    
    return(
        <tr className="center">
            {
                props.rowBtnValues.map(value => {
                 return (
                        value === "=" || value ==="C" ?
                        <td colSpan="2"className="btn-container" key={value} >
                            <Btn 
                            value={value} 
                            handleClick={props.handleClick}
                            />
                        </td>
                            :
                        <td className="btn-container" key={value} >
                            <Btn 
                            value={value} 
                            handleClick={props.handleClick}
                            />
                        </td>
                     );
                })
            }
        </tr>
    )
}