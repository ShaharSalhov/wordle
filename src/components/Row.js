import React from 'react'
import letters from '../letters.json'

export default function Row({ guess, currentGuess }) {

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

    if ( letters.English.map((ob => ob.key)).includes(currentGuessLetters[0]) ) {
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

    else if ( letters.Hebrew.map((ob => ob.key)).includes(currentGuessLetters[0]) ) {
      return (
        <div className='row current'>
          {[...Array(5 - currentGuessLetters.length)].map((_, i) => (
            <div key={i} ></div>
          ))}
          {currentGuessLetters.map( (letter, i) => (
            <div key={i} className='filled' >{letter}</div>
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
