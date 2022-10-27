import React from 'react';
import { decode } from 'html-entities';
import { useState, useEffect } from 'react';

function Question({
  question,
  correct_answer,
  incorrect_answers,
  isFinished,
  setScore,
}) {
  const [isClicked, setIsClicked] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();

  function handleToggle(event, index) {
    setIsClicked(index);
    setSelectedAnswer(event.target.textContent);
  }

  function checkAnswers() {
    if (isClicked === correctIndex) {
      setScore(prevScore => prevScore + 1);
    }
  }

  // useEffect to shuffle the array of answers
  useEffect(() => {
    setCorrectAnswer(correct_answer);
    const answersArray = [correct_answer, ...incorrect_answers];
    const shuffledAnswers = answersArray.sort((a, b) => 0.5 - Math.random());
    setAnswers(shuffledAnswers);
    setCorrectIndex(shuffledAnswers.findIndex(item => item === correct_answer));
  }, []);

  // useEffect to call checkAnswers function & calculate the score
  useEffect(() => {
    checkAnswers();
  }, [isFinished]);

  return (
    <article className="question--container">
      <h2 className="question--title">{decode(question)}</h2>
      <div className="answer--button-container">
        {answers.map((answer, index) => {
          return (
            <button
              key={index}
              className={`answer--button ${
                isClicked === index ? 'button-is-clicked' : null
              } ${isFinished && isClicked === index ? 'green' : null}
              ${
                isFinished && isClicked !== index && index === correctIndex
                  ? 'red'
                  : null
              }
            `}
              onClick={event => {
                handleToggle(event, index);
              }}
            >
              {decode(answer)}
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default Question;
