import axios from 'axios';

const GET_CHALLENGES = 'GET_CHALLENGES';
const GET_CONNECTORS = 'GET_CONNECTORS';

export const getChallenges = () => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        if (token) {
            const challenges = (await axios.get('/api/challenges/', {
                headers: {
                authorization: token,
            },
            })).data;
            dispatch({type: GET_CHALLENGES, challenges })
        }
    }
}

export const getChallengeConnector = () => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        if (token) {
            const connectors = (await axios.get('/api/challengeLine/', {
                headers: {
                    authorization: token,
                }
            })).data;
            dispatch({type: GET_CONNECTORS, connectors})
        }
    }
}


export default function (state = [], action) {
    switch (action.type){
        case GET_CHALLENGES:
            return action.challenges
        case GET_CONNECTORS:
            return action.connectors
        default:
            return state;    
    };
}
