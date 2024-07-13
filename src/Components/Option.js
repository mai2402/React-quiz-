
import { useQuiz } from "../contexts/reactQuizContext";

function Option() {
    const { questions, index, dispatch, answer } = useQuiz();
    const currentQuestion = questions[index];
    const hasAnswered = answer !== null;

    if (!currentQuestion) return null;

    return (
        <div className="options">
            {currentQuestion.options.map((option, optionIndex) => (
                <button
                    className={`btn btn-option 
                    ${optionIndex === answer ? "answer" : ""}
                    ${hasAnswered ? (optionIndex === currentQuestion.correctOption ? "correct" : "wrong") : ""}`}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: "newAnswer", payLoad: optionIndex })}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Option;


























// import {createContext, useContext, useReducer} from "react";

// const quizContext = createContext();

// const SECS_PER_QUESTION = 30;
// const initialState = {
//     questions: [],
//     status: "loading",
//     index: 0,
//     answer: null,
//     points: 0,
//     highScore: 0,
//     secondsRemaining: null
// };

// function reducer(state, action) {
//     switch (action.type) {
//         case "dataRecieved":
//             return {
//                 ...state,
//                 questions: action.payLoad,
//                 status: "ready"
//             }
//         case "dataFailed":
//             return {
//                 ...state,
//                 status: "error"
//             }
//         case "start":
//             return {
//                 ...state,
//                 status: "active",
//                 secondsRemaining: state.questions.length * SECS_PER_QUESTION
//             }
//         case "newAnswer":
//             const question = state
//                 .questions
//                 .at(state.index);
//             return {
//                 ...state,
//                 answer: action.payLoad,
//                 points: action.payLoad === question.correctOption
//                     ? question.points + state.points
//                     : state.points
//             }
//         case "nextQuestion":
//             return {
//                 ...state,
//                 index: state.index + 1,
//                 answer: null
//             }
//         case "finish":
//             return {
//                 ...state,
//                 status: "finished",
//                 highScore: state.points > state.highScore
//                     ? state.points
//                     : state.highScore
//             }
//         case "restart":
//             return {

//                 ...initialState,
//                 questions: state.questions,
//                 status: "ready"
//             }
//         case "tick":
//             return {
//                 ...state,
//                 secondsRemaining: state.secondsRemaining - 1,
//                 status: state.secondsRemaining === 0
//                     ? "finished"
//                     : state.status
//             }
//         default:
//             throw new Error("action unkonwn")
//     }
// }

// function QuizProvider({children}) {
// const [ {questions,status,index,answer,points,highScore,secondsRemaining}, dispatch]=useReducer(reducer,initialState);
// const numOfQuestions = questions.length;
// const maxPoints = questions.reduce((prev,cur)=>prev+cur.points,0);

//     return <quizContext.Provider
//         value={{
//         questions,
//         status,
//         index,
//         answer,
//         points,
//         highScore,
//         secondsRemaining,   
//         numOfQuestions,
//         maxPoints,
//         dispatch
//     }}>
//         {children}
//     </quizContext.Provider>
// }

// function useQuiz() {

//     const quiz = useContext(quizContext);
//     if (quiz === undefined) 
//         throw new Error("quiz context has been used out of quiz Provider ")
//     return quiz;
// }

// export {QuizProvider, useQuiz}




























