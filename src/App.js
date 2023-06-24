import { useState } from "react";
import { useEffect } from "react";
import Wordle from "./components/Wordle";
import solutions from "./solutions.json";


function App() {
  const [solution, setSolution] = useState(null)
  const [language, setLanguage] = useState("English")

  useEffect( () => {
    // fetch('http://localhost:3001/solutions')
    //   .then(res => res.json())
    //   .then(json => {
    //     const randomSolution = json[Math.floor(Math.random()*json.length)]
    //     setSolution(randomSolution.word)
    //   })
    const randomSolution = solutions[language][Math.floor(Math.random() * solutions[language].length)]
    setSolution(randomSolution.word)
  }, [setSolution, language])

  return (
    <div className="App">
        { solution && <Wordle solution={solution} language={language} setLanguage={setLanguage} /> }
    </div>
  );
}

export default App

