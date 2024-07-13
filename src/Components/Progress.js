import { useQuiz } from "../contexts/reactQuizContext"

function Progress() {
    const {index,numOfQuestions,answer,points,maxPoints}=useQuiz();
    return (
        <header className="progress">
            <progress max={numOfQuestions} value={index + Number(answer !== null)}  />
            <p>Question <strong>{index+1}/{numOfQuestions}</strong></p>
            <p>{points}/{maxPoints}</p>

        </header>
    )
}

export default Progress
