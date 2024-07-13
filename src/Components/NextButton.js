import { useQuiz } from "../contexts/reactQuizContext"




function NextButton() {
    const {dispatch,answer,index,numOfQuestions}=useQuiz();
    if (index < numOfQuestions-1)
    return (
        <div>
             <button className="btn btn-ui"   
                                style={{ display: answer !== null ? 'block' : 'none' }}
                                onClick={()=>dispatch({type:"nextQuestion"})} >Next</button>
        </div>
    )

   if(index >= numOfQuestions -1) 
    return (
        <div>
             <button className="btn btn-ui"   
                                style={{ display: answer !== null ? 'block' : 'none' }}
                                onClick={()=>dispatch({type:"finish"})} >Finish</button>
        </div>
    )
}

export default NextButton
