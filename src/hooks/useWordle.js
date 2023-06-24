import { useState } from "react"

const useWordle = (solution, language) => {

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
  }

  const formatGuess = () => {

    let solutionArray = [...solution]

    let formattedGuess = [...currentGuess].map( (l) => {
      return {key: l, color: "grey"}
    })

    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green"
        solutionArray[i] = null
      }
    });

    formattedGuess.forEach((l,i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow"
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  const addNewGuess = (formattedGuess) => {

    if (currentGuess === solution) {
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

    if(key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1)
      })
      return
    }
    setIsWrongLanguage(false)

    if (/^[A-Za-z]$/.test(key)) {  //English
      if (currentGuess.length < 5) {
        // setIsWrongLanguage(false)
        if (language !== "English") {
          setIsWrongLanguage(true)
        } else {
          setCurrentGuess((prev) =>  {
            return prev + key
          })
        }
      }
    }

    if (/^[\u0590-\u05fe]$/.test(key)) {  //Hebrew
      if (currentGuess.length < 5) {
        // setIsWrongLanguage(false)
        if (language !== "Hebrew") {
          setIsWrongLanguage(true)
        } else {
          setCurrentGuess((prev) =>  {
            return key + prev
          })
        }
      }
    }

  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, resetGame, isWrongLanguage} 

}

export default useWordle