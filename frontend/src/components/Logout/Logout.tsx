import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
import * as Styled from "./style.styles";
import {AuthContext} from "../../App";
import {initial, RegisterReducer} from "../../shared/Reducers/RegisterReducer";

const Logout = () => {
const [logged, setLogged] = useState(true);

const {dispatch} = React.useContext(AuthContext);
const [state, dispatchRegister] = React.useReducer(RegisterReducer, initial);
const onSubmit = () => {
    dispatchRegister({
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
            setLogged(false);
        dispatch({
            type:"LOGOUT",
            payload: response.data.response
        })
            const cookies = new Cookies();
            cookies.remove('logged');
        dispatchRegister({
            type: 'Loading',
            payload: false
        })
        }
    );
}



    if(logged && state.loading) {
        return (
            <>
                <Styled.LogoutButton onClick={onSubmit}><Styled.Loader/></Styled.LogoutButton>
            </>
        );
    }else if(logged){
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
