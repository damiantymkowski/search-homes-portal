import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
import * as Styled from "./style.styles";
import {AuthContext} from "../../App";
import {initial, RegisterReducer} from "../../shared/Reducers/RegisterReducer";

const Logout = () => {

const {dispatch} = React.useContext(AuthContext);
const [infoStatus, dispatchInfo] = React.useReducer(RegisterReducer, initial);
    const {state} = React.useContext(AuthContext);
const onSubmit = () => {
    dispatchInfo({
        type: 'Loading',
        payload: true
    })
    console.log(initial);
    axios({
        method: "post",
        url: "registrationLogging.php",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            email: "",
            password: "",
            action: "logging",
        },
        withCredentials: true,
    }).then((response) => {
        dispatch({
            type:"LOGOUT",
            payload: response.data.response
        })
        dispatchInfo({
            type: 'Loading',
            payload: false
        })
        }
    );
}



    if(infoStatus.loading) {
        return (
            <>
                <Styled.LogoutButton onClick={onSubmit}><Styled.Loader/></Styled.LogoutButton>
            </>
        );
    }else if(state.isAuthenticated){
        return (
            <>
                <Styled.LogoutButton onClick={onSubmit}>Wyloguj się</Styled.LogoutButton>
            </>
        );
    }else{
        return (
            <Redirect push to="/"/>
        );
    }
}


export default Logout;
