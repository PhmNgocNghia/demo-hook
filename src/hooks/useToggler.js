import {useState} from 'react'

export default (onOpen) => {
    const [isToggle, setToggle] = useState(false)
    return {
        isToggle,
        toggle: () => {
            if (!isToggle && typeof onOpen === 'function') {
                onOpen()
            }
            
            setToggle(!isToggle)
        },
    }
}