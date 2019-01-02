// This represent media queries and react conf
import React, {
    useEffect
} from 'react'
import useHandlePromise from './useHandlePromise'

export default (fetchFunction) => {
    const {
        isRequesting,
        fetchErr,
        data,
        handlePromise
    } = useHandlePromise()

    useEffect(()=>{
        handlePromise()
    }, [])
}