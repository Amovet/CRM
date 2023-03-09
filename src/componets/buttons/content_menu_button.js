import React from 'react'
import plusIco from '../../assets/img/plus_blue.svg'

function ContentMenuButton({name}) {
    return (
        <button className='content-menu-button'>
            <div className='content-menu-button__name'>
                {name}
            </div>
            <img src={plusIco} alt=""/>
        </button>
    );
}

export default ContentMenuButton;