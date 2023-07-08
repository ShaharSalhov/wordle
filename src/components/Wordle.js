import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import LanguageIcon from '@mui/icons-material/Language';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import letters from "../letters.json"


export default function Wordle( {solution, language, setLanguage, generateNewSolution } ) {

  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, resetGame, isWrongLanguage } = useWordle(solution, language, generateNewSolution)
  const [showModal, setShowModal] = useState(false)

  useEffect( () => {
    window.addEventListener('keyup', handleKeyup)

    if (showModal) {
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, showModal])


  useEffect( () => {
    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
    }
  }, [isCorrect, turn])

  return (
    <React.Fragment>
      <header className="header">
        <h1>SHAHAR'S WORDLE</h1>

        <div className="languageDiv">

          <LanguageIcon className='LanguageIcon'/>

          <FormControl FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              variant='standard'
              labelId="demo-select-small-label"
              id="demo-simple-small"
              value={language}
              onChange={(event) => {
                resetGame()
                setLanguage(event.target.value)
              }}
            >
              { Object.keys(letters).map( lan => <MenuItem value={lan}>{lan}</MenuItem>) }
            </Select>
          </FormControl>

        </div>  
      </header>

      <div>
          <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} language={language}/>

          {isWrongLanguage ? <Alert className='alert' severity="error">Check your keyboard language!</Alert> : null}

          <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} language={language}/>

          {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} resetGame={resetGame} setShowModal={setShowModal}/>}

      </div>
    </React.Fragment>
  )
}
