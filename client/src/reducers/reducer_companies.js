import axios from 'axios';
import izitoast from 'izitoast';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

const INITIAL_STATE = {
	loading: false
};
  
export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case REGISTRATION_REQUEST:
			return { ...state, loading: true};
		case REGISTRATION_SUCCESS:
			return { ...state, loading: false};
		case REGISTRATION_FAILURE:
			return { ...state, loading: false};
		default:
			return state;
    }
}

export function signUpAction(values, history) {
	return async (dispatch) => {
		try {
			const res = await axios.post('http://localhost:8080/api/companies', {values: values});
			izitoast.success({
				message: "Account created",
				position: 'topRight'
			});
		}		
		catch (err) {
			izitoast.error({
				message: "Account already exists",
				position: 'topRight'
			});
		}
	}
}
