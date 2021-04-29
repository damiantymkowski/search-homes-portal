
export const initial = {
    error: "",
    success: "",
    loading: false,
}

export const RegisterReducer = (state: any, action: { type: string, payload: string|boolean|null }) =>{
    switch(action.type){
        case "Error":
            return{
                ...state,
                error: action.payload
            };
        case "Success":
            return{
                ...state,
                success: action.payload,
            }
        case "Loading":
            return{
                ...state,
                loading: action.payload,
            }
        default:
            return state;
    }
}