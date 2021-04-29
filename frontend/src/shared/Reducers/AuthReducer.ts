import Cookies from "universal-cookie";

const cookies = new Cookies();

export const initialState = {
    isAuthenticated: !!cookies.get('logged'),
}

export const reducer = (state: any, action: { type: string }) =>{

    switch(action.type){
        case "LOGIN":
            cookies.set('logged', true, { path: '/' });
            return{
                ...state,
                isAuthenticated: true
            };
        case "LOGOUT":
            cookies.remove('logged');
            return{
                ...state,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}