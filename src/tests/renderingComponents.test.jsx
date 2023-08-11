import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react'
import Grid from '../components/Grid';
import Keypad from '../components/Keypad';
import Wordle from '../components/Wordle'; 

test("header renders successfully", () => {
  render(<Wordle solution={""} language={"English"} setLanguage={()=> {}} generateNewSolution={()=> {}} />);

  const element = screen.getByTestId(/header/i);

  expect(element).toBeInTheDocument();
})

test("Grid renders successfully", () => {
    render(<Grid currentGuess={""} guesses={[]} turn={0} language={"English"} />);

    const element = screen.getByTestId(/grid/i);

    expect(element).toBeInTheDocument();
})

test("Keypad renders successfully", () => {
  render(<Keypad usedKeys={{}} handleKeyup={() => {}} language={"English"} />);

  const element = screen.getByTestId(/keypad/i);

  expect(element).toBeInTheDocument();
})