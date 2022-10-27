import React, { useEffect } from 'react';
import { useState } from 'react';
import Question from './Question';

const url = 'https://opentdb.com/api.php?amount=5&category=9&type=multiple';

function Questions() {
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  async function fetchQuizData() {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    setQuestions(results);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuizData();
  }, []);

  // What needs to be reset in the playAgain function
  function newGame() {
    setIsFinished(false);
    setScore(0);
    fetchQuizData();
  }

  if (!loading) {
    return (
      <section>
        <div>
          {questions.map((question, index) => {
            return (
              <Question
                key={index}
                {...question}
                isFinished={isFinished}
                score={score}
                setScore={setScore}
              />
            );
          })}
        </div>
        <div className="check--answers-container">
          {isFinished && <h3>You scored {score}/5 correct answers</h3>}
          {!isFinished ? (
            <button
              className="check--answers"
              onClick={() => setIsFinished(true)}
            >
              Check Answers
            </button>
          ) : (
            <button className="play--again" onClick={newGame}>
              Play Again
            </button>
          )}
        </div>
      </section>
    );
  } else {
    <h4>LOADING QUESTIONS...</h4>;
  }
}

export default Questions;
