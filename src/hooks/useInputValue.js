import {
    useState
  } from 'react';

export default (initialValue='') => {
    const [value, SetValue] = useState(initialValue)
    return {value, SetValue, onInput: (e) => {
        SetValue(e.target.value)
    }}
}