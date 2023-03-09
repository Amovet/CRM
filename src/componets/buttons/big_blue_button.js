import React from 'react'

function BigBlueButton({img, name}) {
    return (
        <button className='big-blue-button'>
            <div className='big-blue-button__name'>
                {name}
            </div>
            <img src={img} alt=""/>
        </button>
    );
}

export default BigBlueButton;