import Option from "./Option"


function Question({question,dispatch,answer,points}) {
   
    return (
        <div >
            <p>your total {points}</p>
           <h4>{question.question}</h4>
           <Option dispatch={dispatch} question={question} answer={answer}/>
            
        </div>
    )
}

export default Question
