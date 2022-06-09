import axios from 'axios';

const GET_CHALLENGES = 'GET_CHALLENGES';

export const getChallenges = () => {
    return async (dispatch) => {
        const challenges = (await axios.get('/api/challenges/')).data;
        dispatch({type: GET_CHALLENGES, challenges })
    }
}


export default function (state = [], action) {
    switch (action.type){
        case GET_CHALLENGES:
            return action.challenges
        default:
            return state;    
    };
}
