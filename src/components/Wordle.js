import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';


export default function Wordle( {solution, language, setLanguage } ) {

  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, resetGame, isWrongLanguage } = useWordle(solution, language)
  const [showModal, setShowModal] = useState(false)

  useEffect( () => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <React.Fragment>
      <header className="header">
        <h1>WORDLE (LINGO)</h1>

        <div className="languageDiv">
          <p>{language}</p>
          <IconButton disableRipple>
            <LanguageIcon onClick={ () => {
              resetGame()
              language === "English" ? setLanguage("Hebrew") : setLanguage("English") 
            }
              }/>
          </IconButton>
        </div>  
      </header>

      <body className="body">
        <div>
          <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />

          {isWrongLanguage ? <Alert className='alert' severity="error">Check your keyboard language!</Alert> : null}

          <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} language={language}/>

          {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} resetGame={resetGame} setShowModal={setShowModal}/>}

            <p>{solution}</p>
          </div>
      </body>
    </React.Fragment>
  )
}
