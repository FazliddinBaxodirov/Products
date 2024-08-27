import { createContext, useReducer, useState } from "react";
import toast from "react-hot-toast";


const Context = createContext()

const ACTIONS ={
    SAVED:'saved',
}
const initialState = []

const ProductContext = ({children}) => {
    const reduce = (state, action) => {
        switch(action.type){
            case ACTIONS.SAVED:
            const item = products.find(item => item.id === action.payload)
            if(item && !state.some((value) => value.id == item.id)){
                toast.success('Successfully saved')
                return [...state,item]
            }
            else{
                toast.error('Something error')
                return [...state]
            }
        }
    }
    const [products , setProducts] = useState([])
    const [state,dispatch] = useReducer(reduce,initialState)
    return(
        <Context.Provider value={{products,setProducts,state,dispatch,ACTIONS}}>{children}</Context.Provider>
    )
}

export {Context,ProductContext}