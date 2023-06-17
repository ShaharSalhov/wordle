import { useState } from "react";
import { useEffect } from "react";
import Wordle from "./components/Wordle";
import solutions from "./solutions.json"


function App() {
  const [solution, setSolution] = useState(null)

  useEffect( () => {
    // fetch('http://localhost:3001/solutions')
    //   .then(res => res.json())
    //   .then(json => {
    //     const randomSolution = json[Math.floor(Math.random()*json.length)]
    //     setSolution(randomSolution.word)
    //   })
    const randomSolution = solutions[Math.floor(Math.random() * solutions.length)]
    setSolution(randomSolution.word)
  }, [setSolution])

  return (
    <div className="App">
      <h1>WORDLE (LINGO)</h1>
      { solution && <Wordle solution={solution} /> }
    </div>
  );
}

export default App

