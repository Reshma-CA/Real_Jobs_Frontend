import React from 'react'
import { useReducer } from 'react'
import {useImmerReducer} from 'use-immer';

const Testing = () => {

    const initialState= {
        appleCount:1,
        bananaCount:10,
        message:'helooo',
        happy:false
    }

    function ReducerFunction(draft,action){
        switch (action.type) {
            case 'addApple':
                draft.appleCount = draft.appleCount+1
                break;
            case 'ChangeEverything':
                draft.bananaCount = draft.bananaCount+10
                draft.message = action.customMessage
                draft.happy = true;
                break;
                
        }
}
    const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)
  return (
    <>
    <div>Right now the count of apple is:{state.appleCount}</div>
    <div>Right now the count of banana is:{state.bananaCount}</div>
    <div>Right now the message is:{state.message}</div>
    {state.message ? <h1>it is happy</h1>: <h1>not happy</h1>}
    <br/>
    <button onClick={()=>dispatch({type:'addApple'})}>Add apple:</button>
    <br/>
    <button onClick={()=>dispatch({
         type:'ChangeEverything',
         customMessage:'the message comming from dispatch'})}>CHANGE EVERY THING </button>
    
    </>
  )
}

export default Testing