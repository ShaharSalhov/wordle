import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react'
import Wordle from '../components/Wordle';

const mockSetLanguage = jest.fn();
const mockHgenerateNewSolution = jest.fn();

test("Row should be colored correctly", async () => {
  render(<Wordle solution={"start"} language={"English"} setLanguage={mockSetLanguage} generateNewSolution={mockHgenerateNewSolution} />)
  
  const firstButtonElement = screen.getByTestId("button-s")
  fireEvent.click(firstButtonElement);

  const secondButtonElement = screen.getByTestId("button-t")
  fireEvent.click(secondButtonElement);

  const thirdButtonElement = screen.getByTestId("button-a")
  fireEvent.click(thirdButtonElement);

  const forthButtonElement = screen.getByTestId("button-r")
  fireEvent.click(forthButtonElement);

  const fifthButtonElement = screen.getByTestId("button-t")
  fireEvent.click(fifthButtonElement);


  const enterButtonElement = screen.getByTestId("enter-button")
  fireEvent.click(enterButtonElement);


  const firstLetterElement = screen.getByTestId("0-index")
  expect(firstLetterElement).toHaveClass("green");

  const secondLetterElement = screen.getByTestId("1-index")
  expect(secondLetterElement).toHaveClass("green");

  const thirdLetterElement = screen.getByTestId("2-index")
  expect(thirdLetterElement).toHaveClass("green");

  const forthLetterElement = screen.getByTestId("3-index")
  expect(forthLetterElement).toHaveClass("green");

  const fifthLetterElement = screen.getByTestId("4-index")
  expect(fifthLetterElement).toHaveClass("green");

})