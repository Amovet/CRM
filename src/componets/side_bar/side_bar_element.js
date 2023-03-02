import React from 'react'

function SideBarElement({active,img,name}) {
    return (
        <div className={`side-bar-menu__elem side-bar-menu__elem${active?'_active':''}`}>
            <img src={img} alt=""/>
            <div className="side-bar-menu__elem-name">
                {name}
            </div>
            <div className="side-bar-menu__elem-active"/>
            <div className="side-bar-menu__elem-dot"/>
        </div>
    );
}

export default SideBarElement;