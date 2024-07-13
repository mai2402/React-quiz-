
function Progress({index,numOfQuestions,answer,points,maxPoints}) {
    return (
        <header className="progress">
            <progress max={numOfQuestions} value={index + Number(answer !== null)}  />
            <p>Question <strong>{index+1}/{numOfQuestions}</strong></p>
            <p>{points}/{maxPoints}</p>

        </header>
    )
}

export default Progress
