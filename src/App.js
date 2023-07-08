import { useCallback, useState } from "react";
import { useEffect } from "react";
import Wordle from "./components/Wordle";
import languageConfig from "./languageConfig.json";


function App() {
  const [solution, setSolution] = useState(null)
  const [language, setLanguage] = useState("English")

  const generateNewSolution = useCallback(
    () => {
      let solutions = languageConfig[language].solutions
      const randomSolution = solutions[Math.floor(Math.random() * solutions.length)]
      setSolution(randomSolution.word)
    },
    [language, setSolution]
  )

  useEffect(() => {
    const languageData = window.localStorage.getItem('MY_LANGUAGE_STATE');
    if ( languageData !== null ) setLanguage(JSON.parse(languageData));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('MY_LANGUAGE_STATE', JSON.stringify(language));
  }, [language])

  useEffect( () => {
    // fetch('http://localhost:3001/solutions')
    //   .then(res => res.json())
    //   .then(json => {
    //     const randomSolution = json[Math.floor(Math.random()*json.length)]
    //     setSolution(randomSolution.word)
    //   })
    generateNewSolution()
  }, [setSolution, language, generateNewSolution])

  return (
    <div className="App">
        { solution && <Wordle solution={solution} language={language} setLanguage={setLanguage} generateNewSolution={generateNewSolution} /> }
    </div>
  );
}

export default App

