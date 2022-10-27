function Start({ handleStart }) {
  return (
    <>
      <h2 className="quiz--header">Quizzical</h2>
      <p className="quiz-description">An app to test your knowledge!</p>
      <button className="start--button" type="button" onClick={handleStart}>
        Start quiz
      </button>
    </>
  );
}
export default Start;
