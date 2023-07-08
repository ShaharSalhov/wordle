import React from 'react'

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

    if ( language === "English" ) {
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

    else if ( language === "Hebrew" ) {
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
