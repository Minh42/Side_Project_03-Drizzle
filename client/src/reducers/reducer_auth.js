import axios from 'axios';
import izitoast from 'izitoast';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

const INITIAL_STATE = {
    authenticated: false,
    currentCompany: null,
    currentUser: null
};
  
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case AUTHENTICATED:
        return { ...state, authenticated: true, currentCompany: action.payload, currentUser: action.payload};
      case UNAUTHENTICATED:
        return { ...state, authenticated: false, currentCompany: action.payload, currentUser: action.payload};
      case AUTHENTICATION_ERROR:
        return { ...state};
      default:
        return state;
    }
}

export function signInAction({email, password}, history) {
	return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/signin', {email, password});
            dispatch({ 
                type: AUTHENTICATED,
                payload: res.data.company
            });
            history.push('/company')
        } catch (err) {
            dispatch({
                type: AUTHENTICATION_ERROR
            });
            izitoast.error({
				message: "Unauthorized",
				position: 'topRight'
			});
        }
	};
}

export function signInActionOauth(userID, history) {
	return (dispatch) => {
        console.log(userID)
        dispatch({ 
            type: AUTHENTICATED,
            payload: userID
        });
        history.push('/influencer');
	}
}

export function signOutAction(history) {
	return async (dispatch) => {
        await axios.get('http://localhost:8080/api/auth/logout');
		dispatch({ 
			type: UNAUTHENTICATED,
			payload: null
        })
        history.push('/')
	}
}