import { useContext, useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from"../StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import FinishScreen from "./FinishScreen"
import Footer from "./Footer"
import Timer from "./Timer"
import { useQuiz } from "../contexts/reactQuizContext"




export default function App(){
const {dispatch,status}=useQuiz();


  
useEffect(()=>{
  const fetchData = async ()=>{

    try{
       const response =await fetch(`http://localhost:8000/questions`);
        const data = await response.json();
        dispatch({type:"dataRecieved" ,payLoad: data});
        
    }
    catch(e){
           dispatch({type:"dataFailed"})
    }
  }
  fetchData();
},[])


  return <div className="app">
     <Header />
     <Main>
      {status==="loading" && <Loader/>}
      {status=== "error" && <Error/>}
      {status==="ready" && <  StartScreen />}
      {status=== "finished" && <FinishScreen />}
    
      
      {status==="active" && (
        <>

      <Question /> 
      <Footer >
      <Timer  />
      <NextButton/> 
      </Footer>
    </>
    
      )}
      </Main>
  </div>
}
