import React from 'react'
import letters from "../letters.json"

export default function Keypad( {usedKeys, handleKeyup, language} ) {
  // const [letters, setLetters] = useState(null)

  // useEffect( () => {
  //   fetch('http://localhost:3001/letters')
  //     .then(res => res.json())
  //     .then(json => {
  //       setLetters(json)
  //   })
  // }, [])

  return (
    <div className='keypad'>
      {letters[language].map((l) => {
        const color = usedKeys[l.key]
        return (
          <button key={l.key} className={color} onClick={ () => (handleKeyup(l)) } >{l.key.toUpperCase()}</button>
        )
      })}
      <button key="Delete" className='action' onClick={ () => handleKeyup({key: "Backspace"}) }>⌫</button>
      <button key="Enter" className='action' onClick={ () => handleKeyup({key: "Enter"}) }>↵</button>
    </div>
  )
}
