import React from 'react'
import {connect} from "react-redux";
import {getCalls} from "../redux/thunk/calls";


const InfoLayout = ({children,getCalls}) => {

    let getInfo = () => {
        getCalls()
    };
    return (
        <>
            {getInfo()}
            {children}
        </>
    );
};

export default connect(null, {getCalls})(InfoLayout);