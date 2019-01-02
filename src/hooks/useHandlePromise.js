// This hook is replace for data fetching hoc
// Return data

/**
 * data
 * isFetching
 * fetchErr
 * reFetch
 */
import {
    useReducer
  } from 'react';



function reducer(state, action) {   
    switch (action.type) {
        
        case 'REQUEST_PENDING':
        return {...state, isRequesting: true}
        case 'REQUEST_SUCCESS':
            return {...state, isRequesting: false, data: action.payload}
        case 'REQUEST_ERROR':
            return {...state, isRequesting: false, fetchErr: action.payload}
         default:        // Alternatively you can throw an error if an invalid action is dispatched.
            return state;
    }
}

const useHandlePromise = () => {
    const [requestState, dispatchRequestState] = useReducer(reducer,{
        isRequesting: false,
        data: null,
        fetchErr: ''
    })

    const  handlePromise = async (promise) => {
        dispatchRequestState({type: 'REQUEST_PENDING'})  
        promise.then(res=>{
            dispatchRequestState({type: 'REQUEST_PENDING', payload: res})  
        }).catch(err=>{
            dispatchRequestState({type: 'REQUEST_ERROR', payload: err})
        })
    }

    return {...requestState, handlePromise}
}

export default useHandlePromise