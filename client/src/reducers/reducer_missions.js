import axios from 'axios';
import izitoast from 'izitoast';

export const MISSIONS_REQUEST = 'MISSIONS_REQUEST';
export const MISSIONS_SUCCESS = 'MISSIONS_SUCCESS';
export const MISSIONS_ERROR = 'MISSIONS_ERROR';

const INITIAL_STATE = {
	loading: false,
	missions: null
};
  
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case MISSIONS_REQUEST:
        return { ...state, loading: true};
      case MISSIONS_SUCCESS:
        return { ...state, loading: false, missions: action.payload};
      case MISSIONS_ERROR:
		return { ...state, loading: false};
      default:
        return state;
    }
}

export function getAllMissionsAction(userID) {
	return async (dispatch) => {
		try {
			const res = await axios.get('http://localhost:8080/api/missions/' + userID);
            dispatch({ 
                type: MISSIONS_SUCCESS,
                payload: res.data.missions
            });
			izitoast.success({
				message: "ALL missions retrieved for this user",
				position: 'topRight'
			});
		}		
		catch (err) {
			console.log(err)
		}
	}
}