import React from 'react'
import languageConfig from "../languageConfig.json"

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
    <div className='keypad' data-testid="keypad" language={language}>
      {languageConfig[language].letters.map((l) => {
        const color = usedKeys[l.key]
        return (
          <button data-testid={`button-${l.key}`} key={l.key} className={color} onClick={ () => (handleKeyup(l)) } >{l.key.toUpperCase()}</button>
        )
      })}
      <button data-testID={"delete-button"} key="Delete" className='action' onClick={ () => handleKeyup({key: "Backspace"}) }>⌫</button>
      <button data-testID={"enter-button"} key="Enter" className='action' onClick={ () => handleKeyup({key: "Enter"}) }>↵</button>
    </div>
  )
}
