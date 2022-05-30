import {useReducer, useState} from 'react'

const reducer = (state,action) => {
  if(action.type === "INPUT_VALUE"){
    return {
      ...state,
      value: action.value
    }
  }
  if(action.type ==='INPUT_BLUR'){
    return {
      ...state,
      isTouched: action.isTouched
    }
  }
}

const useInput = (validateState) => {
//   const [entredValue, setEntredValue] = useState('')
//   const [isTouched,setIsTouched] = useState(false)
const [state,dispatchState] = useReducer(reducer, {
  value:"",
  isTouched:false,
})


  const valueIsValid = validateState(state.value)
  const hasError = !valueIsValid && state.isTouched

  const valueChangeHandler = (event) => {
    //   setEntredValue(event.target.value)
    dispatchState({type: 'INPUT_VALUE', value: event.target.value})
  }
  
  const inputBlurHandler = (event) => {
      dispatchState({type: 'INPUT_BLUR', isTouched:true})
  } 
  return {
      value:state.value,
      isValid:valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
  }
};
export default useInput
  