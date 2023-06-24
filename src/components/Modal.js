import React from 'react'

export default function Modal( {isCorrect, turn, solution, resetGame, setShowModal} ) {
  return (
    <div className='modal'>

      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className='solution'>{solution}</p>
          <p>You found the solution in {turn} guesses</p>
          <button className='button' onClick={ () => {
            resetGame()
            setShowModal(false)
          }} >New Game</button>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>Nevermind...</h1>
          <p className='solution'>{solution}</p>
          <p>Better luck next time!</p>
          <button className='button' onClick={ () => {
            resetGame()
            setShowModal(false)
            }} >New Game</button>
        </div>
      )}

    </div>
  )
}
