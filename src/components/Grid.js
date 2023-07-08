import React from 'react'
import Row from './Row'


export default function Grid( { currentGuess, guesses, turn, language } ) {
  return (
    <div>

      {guesses.map( ( g, i ) => {

        if (turn === i){
          return <Row key={i} currentGuess={currentGuess} language={language} />
        }

        return <Row key={i} guess={g} />
      })}

    </div>
  )
}
