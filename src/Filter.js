import React from 'react';

let categories = [ 'None', 'Food', 'Drinks', 'Coffee', 'Shops', 'Arts', 'Outdoors', 'Sights', 'Trending', 'TopPicks' ]

export default function InfoCardPopup(props){

    return(
        <select className='dropdownOptions' onChange={props.handleDropdownSelect}>
            <option value='None' selected disabled>Category Filter</option>
            {categories.map(category => 
                <option value={category}>{category}</option>    
            )}
        </select>
    )

}