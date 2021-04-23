import Cookies from "universal-cookie";

export const initialState = {
    isAuthenticated: false,
}

export const reducer = (state: any, action: { type: string }) =>{
    const cookies = new Cookies();
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