import { useState } from "react"
import languageConfig from "../languageConfig.json"

const useWordle = (solution, language, generateNewSolution) => {

  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})
  const [isWrongLanguage, setIsWrongLanguage] = useState(false)

  const resetGame = () => {
    setTurn(0);
    setCurrentGuess('')
    setGuesses([...Array(6)])
    setHistory([])
    setIsCorrect(false)
    setUsedKeys({})
    generateNewSolution()
  }

  // const middleHebrewLettersToFinalLetters = {
  //   "\u05E6": "\u05E5", // Tsadi
  //   "\u05E4": "\u05E3", // Pei
  //   "\u05E0": "\u05DF", // Nun 
  //   "\u05DE": "\u05DD", // Mem
  //   "\u05DB": "\u05DA" // Haf
  // }

  const createFinalLettersToMiddleLetters = ( middleLettersToFinalLetters ) => {

    const finalLettersToMiddleLetters = {};
    Object.entries(middleLettersToFinalLetters).forEach(([key, value]) => {
      finalLettersToMiddleLetters[value] = key;
    });
    return finalLettersToMiddleLetters;
  }

  const finalLettersToMiddleLettersMenu = createFinalLettersToMiddleLetters(languageConfig[language].middleLettersToFinalLetters)

  const finalLettersArray = Object.keys(finalLettersToMiddleLettersMenu); 

  const formatGuess = () => {

    let solutionArray = [...solution]

    if (languageConfig[language].isLeftToRight) {

      let formattedGuess = [...currentGuess].map( (l) => {
        return {key: l, color: "grey"}
      })
  
      formattedGuess.forEach((l, i) => {
        if (solutionArray[i] === l.key) {
          formattedGuess[i].color = "green"
          solutionArray[i] = null // to deal with the same ltter inserted
        }
      });
  
      formattedGuess.forEach((l,i) => {
        if (solutionArray.includes(l.key) && l.color !== "green" ) {
          formattedGuess[i].color = "yellow"
          solutionArray[solutionArray.indexOf(l.key)] = null
        }
      })
  
      return formattedGuess
    }

    else {

      const solutionLength = solution.length

      let formattedGuess = [...currentGuess].map( (l) => {
        return {key: l, color: "grey"}
      })
      
      formattedGuess.forEach((l, i) => {

        if (solutionArray[(solutionLength -1) - i] === l.key) {
          formattedGuess[i].color = "green"
          solutionArray[(solutionLength -1) - i] = null // To deal with the same letter inserted
        }
      });
  
      formattedGuess.forEach((l,i) => {
        if (solutionArray.includes(l.key) && l.color !== "green") {
          formattedGuess[i].color = "yellow"
          solutionArray[solutionArray.indexOf(l.key)] = null // // To deal with the same letter inserted
        }
       
        if (i === 0 && solutionArray.includes(finalLettersToMiddleLettersMenu[l.key]) && l.color !== "green") {
          formattedGuess[i].color = "yellow"
          solutionArray[solutionArray.indexOf(l.key)] = null // // To deal with the same letter inserted
        }
      })
      return formattedGuess
    }
  }

    

  const addNewGuess = (formattedGuess) => {

    if ( languageConfig[language].isLeftToRight ? currentGuess === solution : currentGuess.split('').reverse().join('') === solution ) {
      setIsCorrect(true)
    }

    setGuesses( (prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory( (prevHistory) => {
      return [...prevHistory, currentGuess]
    })

    setTurn( (prevTurn) => {
      return prevTurn + 1
    })

    setUsedKeys( (prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}
      formattedGuess.forEach( (l) => {
        const currentColor = newKeys[l.key]

        if (l.color === "green") {
          newKeys[l.key] = "green"
          return
        }

        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow"
          return
        }

        if (l.color === "grey" && currentColor !== "green" && currentColor !== "yellow") {
          newKeys[l.key] = "grey"
          return
        }
      })
      return newKeys
    })

    setCurrentGuess('')

  }

  const handleKeyup = ({ key }) => {
    
    if (key === "Enter") {

      if (turn > 5) {
        return
      }
      if (history.includes(currentGuess)){
        return
      }
      if (currentGuess.length !== 5){
        return
      }

      const formatted = formatGuess()
      addNewGuess(formatted)
    }

    if(key === "Backspace" && languageConfig[language].isLeftToRight) {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1)
      })
      return
    }

    if(key === "Backspace" && !languageConfig[language].isLeftToRight) {
      setCurrentGuess((prev) => {
        return prev.slice(1, prev.length)
      })
      return
    }
    setIsWrongLanguage(false) //todo: check if needed



    let isValidInput = languageConfig[language].letters.map(ob => ob.key).includes(key.toLowerCase()) || Object.values(languageConfig[language].middleLettersToFinalLetters).includes(key.toLowerCase())

    if ( currentGuess.length >= 5) {
      return
    }

    if (isValidInput && languageConfig[language].isLeftToRight) {
      setCurrentGuess((prev) =>  {
        return prev + key
      })
    }
    else if (isValidInput && !languageConfig[language].isLeftToRight) {
      if (currentGuess.length <= 3 && !finalLettersArray.includes(key)) {
        setCurrentGuess((prev) =>  {
          return key + prev
        })
      } 
      else if (currentGuess.length <= 3 && finalLettersArray.includes(key)) {
        setCurrentGuess((prev) =>  {
          return finalLettersToMiddleLettersMenu[key] + prev
        })
      }

      else if (currentGuess.length === 4 && finalLettersArray.includes(key)) {
        setCurrentGuess((prev) =>  {
          return key + prev
        })
      } 
      else if (currentGuess.length === 4 && languageConfig[language].middleLettersToFinalLetters[key]) {
        setCurrentGuess((prev) =>  {
          return languageConfig[language].middleLettersToFinalLetters[key] + prev
        })
      }
      else setCurrentGuess((prev) =>  {
        return key + prev
      })
    }
    else {
      setIsWrongLanguage(true)
    }

  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, resetGame, isWrongLanguage} 

}

export default useWordle