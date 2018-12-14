import axios from 'axios';
import izitoast from 'izitoast';

export const BRIEFS_REQUEST = 'BRIEFS_REQUEST';
export const BRIEFS_SUCCESS = 'BRIEFS_SUCCESS';
export const BRIEFS_ERROR = 'BRIEFS_ERROR';

export const ALL_BRIEFS_REQUEST = 'BRIEFS_REQUEST';
export const ALL_BRIEFS_SUCCESS = 'BRIEFS_SUCCESS';
export const ALL_BRIEFS_ERROR = 'BRIEFS_ERROR';

const INITIAL_STATE = {
	loading: false,
	briefs: null,
	allbriefs: null
};
  
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case BRIEFS_REQUEST:
        return { ...state, loading: true};
      case BRIEFS_SUCCESS:
        return { ...state, loading: false, briefs: action.payload};
      case BRIEFS_ERROR:
				return { ...state, loading: false};
			case ALL_BRIEFS_REQUEST:
        return { ...state, loading: true};
      case ALL_BRIEFS_SUCCESS:
        return { ...state, loading: false, briefs: action.payload};
      case ALL_BRIEFS_ERROR:
        return { ...state, loading: false};
      default:
        return state;
    }
}

export function newBriefAction(values) {
	return async (dispatch) => {
		try {
			const res = await axios.post('http://localhost:8080/api/briefs', {values: values});
			izitoast.success({
				message: "Brief created",
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

export function getBriefsAction(company) {
	return async (dispatch) => {
		try {
			const res = await axios.get('http://localhost:8080/api/briefs/' + company);
            dispatch({ 
                type: BRIEFS_SUCCESS,
                payload: res.data.briefs
            });
			izitoast.success({
				message: "Briefs retrieved",
				position: 'topRight'
			});
		}		
		catch (err) {
			console.log(err)
		}
	}
}

export function getAllBriefsAction() {
	return async (dispatch) => {
		try {
			const res = await axios.get('http://localhost:8080/api/briefs');
            dispatch({ 
                type: ALL_BRIEFS_SUCCESS,
                payload: res.data.allbriefs
            });
			izitoast.success({
				message: "ALL Briefs retrieved",
				position: 'topRight'
			});
		}		
		catch (err) {
			console.log(err)
		}
	}
}

export function applyBriefAction({userID, missionID}) {
	return async (dispatch) => {
		try {
			const res = await axios.put('http://localhost:8080/api/briefs/' + missionID, { userID: userID });
			izitoast.success({
				message: "Applied for this mission with success",
				position: 'topRight'
			});
		}		
		catch (err) {
			console.log(err)
		}
	}
}

