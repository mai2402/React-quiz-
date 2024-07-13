import { useQuiz } from "../contexts/reactQuizContext"
import Option from "./Option"
import Progress from "./Progress"

function Question() {
   const {questions,points,index}=useQuiz();
   const currentQuestion=questions[index]
   
    return (
        <div >
           <h4>{currentQuestion.question}</h4>
           <Progress/>
            <p>your total {points}</p>
           <Option />
            
        </div>
    )
}

export default Question
