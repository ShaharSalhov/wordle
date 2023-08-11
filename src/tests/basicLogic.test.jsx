import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react'
import Wordle from '../components/Wordle';


const mockSetLanguage = jest.fn();
const mockHgenerateNewSolution = jest.fn();

test("grid should display user's input when clicking Hebrew letters buttons on screen", async () => {
  render(<Wordle solution={""} language={"Hebrew"} setLanguage={mockSetLanguage} generateNewSolution={mockHgenerateNewSolution} />)
  const gridElement = screen.getByTestId("grid")
  const keypadButtonElement = screen.getByTestId("button-א")
  fireEvent.click(keypadButtonElement);
  const cellElemnt = screen.getByTestId("letter-א")
  expect(gridElement).toContainElement(cellElemnt);
})

test("grid should display user's input when clicking English letters buttons on screen", async () => {
  render(<Wordle solution={""} language={"English"} setLanguage={mockSetLanguage} generateNewSolution={mockHgenerateNewSolution} />)
  const gridElement = screen.getByTestId("grid")
  const keypadButtonElement = screen.getByTestId("button-a")
  fireEvent.click(keypadButtonElement);
  const cellElemnt = screen.getByTestId("letter-a")
  expect(gridElement).toContainElement(cellElemnt);
})


// test("should change language from English to Hebrew", async () => {
//   render(<Wordle solution={""} language={"English"} setLanguage={mockSetLanguage} generateNewSolution={mockHgenerateNewSolution} />)
  
//   const keypadElement = screen.getByTestId("keypad")
//   const englishButtonElement = screen.getByTestId("button-a")
//   expect(keypadElement).toContainElement(englishButtonElement);


  // const languageSelect = screen.getByTestId("language-select")
  // const x = languageSelect.childNodes[1]
  // fireEvent.change(x, { target: { value: "Hebrew" } });
  // screen.debug(x)
  
  // const dropdownElement = screen.getByTestId("language-select-form")
  // fireEvent.mouseDown(dropdownElement)

  // const listElement = within(screen.getByTestId("language-select"))

  // const menuItem = screen.getByTestId("select-option-Hebrew")
  // fireEvent.click(listElement.;


  // const languageDiv = within(screen.getByTestId("language-div"))
  // UserEvent.click(languageDiv.getByRole( "button"));
  // UserEvent.click(screen.getByTestId("select-option-Hebrew"))
  // // console.log(languageDiv.getByRole("button"))
  // // fireEvent.mouseDown(languageDiv.getByRole("button"));
  // // fireEvent.click(screen.getByTestId("select-option-Hebrew"))
  // // await waitFor(() =>   console.log(screen.debug())  );

  // console.log(screen.debug()) 


  // const listbox = within(languageDiv.getByRole('listbox'));
  // fireEvent.click(listbox.getByText(/Hebrew/i));
  // fireEvent.click(listbox.getByTestId("select-option-Hebrew"));

  // console.log(languageDiv.getByRole('listbox'))

  // fireEvent.click(languageDiv.getByTestId("select-option-Hebrew"));

  // UserEvent.click(screen.getByText(/Hebrew/i))
  // console.log(screen.getByTestId("select-option-Hebrew"))


  // const hebrewButtonElement = screen.getByTestId("button-א")
  // expect(keypadElement).toContainElement(hebrewButtonElement);
// })

// test("should change language to Hebrew", async () => {
//   render(<Wordle solution={""} language={"English"} setLanguage={mockSetLanguage} generateNewSolution={mockHgenerateNewSolution} />)
// //   const dropdownElement = screen.getByTestId("language-div")

// //   fireEvent.change(dropdownElement);
//   const keypadElement = screen.getByTestId("keypad")
//   const buttonElement = screen.getByTestId("button-א")
//   expect(keypadElement).toContainElement(buttonElement);
// })



