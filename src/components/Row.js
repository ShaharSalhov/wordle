import React from 'react'
import letters from "../letters.json"

export default function Row({ guess, currentGuess, language }) {

  if (guess) {
    return (
      <div className='row past'>
        {guess.map( (l, i) => (
          <div key={i} className={l.color}>{l.key}</div>
        ))}
      </div>
    )
  }

  if (currentGuess) {

    let currentGuessLetters = currentGuess.split('')

    if ( letters[language].isLeftToRight ) {
      return (
        <div className='row current'>
          {currentGuessLetters.map( (letter, i) => (
            <div key={i} className='filled' >{letter}</div>
          ))}
          {[...Array(5 - currentGuessLetters.length)].map((_, i) => (
            <div key={i} ></div>
          ))}
        </div>
      )
    }

    else {
      return (
        <div className='row current'>
          {[...Array(5 - currentGuessLetters.length)].map((_, i) => (
            <div key={i} ></div>
          ))}
          {currentGuessLetters.map( (letter, i) => (
            <div 
              key={`${letter}-${(currentGuessLetters.length-1)-i}`} // to make the new letter inserted bounce. The key must be uniqe and this syntax deals with sequence of same letters. Now it actually changes at every render and gets a new class.
              className='filled'
            >
              {letter}
            </div>
          ))}
        </div>
      )
    }    
  }

  return (
    <div className='row'>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

    </div>
  )
}
