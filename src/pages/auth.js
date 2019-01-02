import React from 'react'
import authenticate from '../services/authenticate'
import useInputValue from '../hooks/useInputValue'
import useHandlePromise from '../hooks/useHandlePromise'

const Authenticate = React.memo(({onAuthSuccessful})=>{
    const userInputValue = useInputValue('')
    const passwordInputValue = useInputValue('')
    const {
        isRequesting,
        fetchErr,
        handlePromise
    } = useHandlePromise()


    return (
        <div>
            Request state: {isRequesting} <br/>
            Request error: {fetchErr}
            <hr/>
            username: <input {...userInputValue} /> <br/>
            password: <input {...passwordInputValue} /> <br/>
            <button onClick={async ()=>{
                const user = await handlePromise(authenticate(userInputValue.value, passwordInputValue.value))
                if (user !== null) {
                    onAuthSuccessful(user)
                }
            }}>login</button>
        </div>
    )
})

export default Authenticate