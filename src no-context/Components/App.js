import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from"../StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishScreen from "./FinishScreen"
import Footer from "./Footer"
import Timer from "./Timer"


const SECS_PER_QUESTION =30;
const initialState ={
  questions :[],
  status: "loading",
  index: 0,
  answer:null,
  points:0,
  highScore:0,
  secondsRemaining: null,

};

function reducer(state,action){
switch (action.type){
  case "dataRecieved":
    return {...state , questions : action.payLoad,status :"ready"}
    case "dataFailed":
      return {...state, status:"error"}
    case "start":
      return{...state, status:"active",
        secondsRemaining :state.questions.length * SECS_PER_QUESTION,
      }
    case "newAnswer":
      const question = state.questions.at(state.index);
      return{
        ...state, answer: action.payLoad,
        points : action.payLoad === question.correctOption? 
        question.points + state.points : 
        state.points
      }     
    case "nextQuestion":
      return {
         ...state , index: state.index +1,answer:null
      }  
    case "finish":
      return{
        ...state, status: "finished" ,
         highScore :
         state.points > state.highScore ? 
         state.points :state.highScore,
      }  
    case "restart":
      return{
         
        ...initialState,
        questions: state.questions,
        status: "ready",
        
      }  
    case "tick":
      return{
        ...state , 
        secondsRemaining: state.secondsRemaining -1,
        status: state.secondsRemaining === 0 ? "finished"
        : state.status,
      }  
    default :
    throw new Error("action unkonwn")
}
}

export default function App(){
const [ {questions,status,index,answer,points,highScore,secondsRemaining}, dispatch]=useReducer(reducer,initialState);
const numOfQuestions = questions.length;
const maxPoints = questions.reduce((prev,cur)=>prev+cur.points,0);


  
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
      {status==="ready" && <  StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch}/>}
      {status=== "finished" && <FinishScreen maxPoints={maxPoints} points={points} highScore={highScore} dispatch={dispatch}/>}
    
      
      {status==="active" && (
        <>
      <Progress numOfQuestions={numOfQuestions} answer={answer}
                points={points}    index={index}  maxPoints={maxPoints}   />

      <Question  question={questions[index]} dispatch={dispatch} answer={answer} points={points} /> 
      <Footer secondsRemaining={secondsRemaining} >
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton dispatch={dispatch} answer={answer} index={index} numOfQuestions={numOfQuestions}/> 
      </Footer>
    </>
    
      )}
      </Main>
  </div>
}
