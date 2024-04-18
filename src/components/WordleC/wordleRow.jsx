import React from 'react';
import wordleTile from './wrdleTile';

export default function wordleRow(props) {
    const numRow = [1, 2, 3, 4, 5]
    return (
        <div className = "flex flex-row justify-center items-center">

            {
                numRow.map((item, index) => (<Tile rowId={props.id} key={index} id={index} />))
                   
                    
                
            }
        </div>
    )
}