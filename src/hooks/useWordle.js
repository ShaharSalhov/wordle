import { useState } from "react"

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

  const middleHebrewLettersToFinalLetters = {
    "\u05E6": "\u05E5", // Tsadi
    "\u05E4": "\u05E3", // Pei
    "\u05E0": "\u05DF", // Nun 
    "\u05DE": "\u05DD", // Mem
    "\u05DB": "\u05DA" // Haf
  }

  const createFinalHebrewLettersToMiddleLetters = ( middleHebrewLettersToFinalLetters ) => {

    const finalHebrewLettersToMiddleLetters = {};
    Object.entries(middleHebrewLettersToFinalLetters).forEach(([key, value]) => {
      finalHebrewLettersToMiddleLetters[value] = key;
    });
    return finalHebrewLettersToMiddleLetters;
  }

  const finalHebrewLettersToMiddleLettersMenu = createFinalHebrewLettersToMiddleLetters(middleHebrewLettersToFinalLetters)

  const finalHebrewLettersArray = Object.keys(finalHebrewLettersToMiddleLettersMenu); 



  const formatGuess = () => {

    let solutionArray = [...solution]

    if (language === "English") {

      let formattedGuess = [...currentGuess].map( (l) => {
        return {key: l, color: "grey"}
      })
  
      formattedGuess.forEach((l, i) => {
        if (solutionArray[i] === l.key) {
          formattedGuess[i].color = "green"
          // solutionArray[i] = null ///check
        }
      });
  
      formattedGuess.forEach((l,i) => {
        if (solutionArray.includes(l.key) && l.color !== "green") {
          formattedGuess[i].color = "yellow"
          // solutionArray[solutionArray.indexOf(l.key)] = null
        }
        // if (!finalHebrewLettersArray.includes(l.key) && solutionArray[4] === middleHebrewLettersToFinalLetters[l.key])
        //   formattedGuess[i].color = "yellow"
        //   solutionArray[solutionArray.indexOf(l.key)] = null
      })
  
      return formattedGuess
    }

    else if (language === "Hebrew") {

      const solutionLength = solution.length

      let formattedGuess = [...currentGuess].map( (l) => {
        return {key: l, color: "grey"}
      })
      
      formattedGuess.forEach((l, i) => {
        // console.log(`i=${i} l.key=${l.key} | solutionArray[(solutionLength -1) - i]=${solutionArray[(solutionLength -1) - i]}|
        // will change formattedGuess[(solutionLength -1) - i].key=${formattedGuess[(solutionLength -1) - i].key}`)

        if (solutionArray[(solutionLength -1) - i] === l.key) {
          formattedGuess[i].color = "green"
          // solutionArray[(solutionLength -1) - i] = null // TODO: check why
        }
      });
  
      formattedGuess.forEach((l,i) => {
        if (solutionArray.includes(l.key) && l.color !== "green") {
          formattedGuess[i].color = "yellow"
          // solutionArray[solutionArray.indexOf(l.key)] = null// TODO: check why
        }
        // if (!finalHebrewLettersArray.includes(l.key) && solutionArray[4] === middleHebrewLettersToFinalLetters[l.key]) {
        //   formattedGuess[i].color = "yellow"
        //   solutionArray[solutionArray.indexOf(l.key)] = null
        // }    
       
        if (i === 0 && solutionArray.includes(finalHebrewLettersToMiddleLettersMenu[l.key]) && l.color !== "green") {
          formattedGuess[i].color = "yellow"
          console.log("im here")
          // solutionArray[solutionArray.indexOf(l.key)] = null// TODO: check why
        }
      })
      return formattedGuess
    }
  }

    

  const addNewGuess = (formattedGuess) => {

    if ( language === "English" ? currentGuess === solution : currentGuess.split('').reverse().join('') === solution ) {
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

    if(key === "Backspace" && language === "English") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1)
      })
      return
    }

    if(key === "Backspace" && language === "Hebrew") {
      setCurrentGuess((prev) => {
        return prev.slice(1, prev.length)
      })
      return
    }
    setIsWrongLanguage(false) //todo: check if needed

    if (/^[A-Za-z]$/.test(key)) {  //English
      if (currentGuess.length < 5) {
        if (language !== "English") {
          setIsWrongLanguage(true)
        } else {
          setCurrentGuess((prev) =>  {
            return prev + key
          })
        }
      }
    }

    if (/^[\u05D0-\u05EA]$/.test(key)) {  //Hebrew

      if (currentGuess.length < 5) {

        if (language !== "Hebrew") {
          setIsWrongLanguage(true)
        } 
        
        else {
          if (currentGuess.length <= 3 && !finalHebrewLettersArray.includes(key)) {
            setCurrentGuess((prev) =>  {
              return key + prev
            })
          } 
          else if (currentGuess.length <= 3 && finalHebrewLettersArray.includes(key)) {
            setCurrentGuess((prev) =>  {
              return finalHebrewLettersToMiddleLettersMenu[key] + prev
            })
          }
  
          else if (currentGuess.length === 4 && finalHebrewLettersArray.includes(key)) {
            setCurrentGuess((prev) =>  {
              return key + prev
            })
          } 
          else if (currentGuess.length === 4 && middleHebrewLettersToFinalLetters[key]) {
            setCurrentGuess((prev) =>  {
              return middleHebrewLettersToFinalLetters[key] + prev
            })
          }
          else setCurrentGuess((prev) =>  {
            return key + prev
          })
        }
      }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, resetGame, isWrongLanguage} 

}

export default useWordle