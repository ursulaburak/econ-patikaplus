import React, { useState, useEffect } from 'react';



const TestApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [timer, setTimer] = useState(30);
  const [results, setResults] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion(null);
    } else {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  useEffect(() => {
    const showOptionsTimer = setTimeout(() => setShowOptions(true), 4000);
    return () => clearTimeout(showOptionsTimer);
  }, [currentQuestion]);

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    setResults((prevResults) => [
      ...prevResults,
      { question: questions[currentQuestion].question, selectedOption, isCorrect },
    ]);
    handleNextQuestion(selectedOption);
  };

  const handleNextQuestion = (selectedOption) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30);
      setShowOptions(false);
    } else {
      setTestCompleted(true);
    }
  };

  const getSummary = () => {
    const correct = results.filter((result) => result.isCorrect).length;
    const incorrect = results.filter((result) => result.selectedOption && !result.isCorrect).length;
    const unanswered = questions.length - results.length;
    return { correct, incorrect, unanswered };
  };

  if (testCompleted) {
    const summary = getSummary();
    return (
      <div>
        <h1>Test Completed</h1>
        <p>Correct Answers: {summary.correct}</p>
        <p>Incorrect Answers: {summary.incorrect}</p>
        <p>Unanswered: {summary.unanswered}</p>
        <button onClick={() => window.location.reload()}>Restart Test</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Teste Başla</h1>
      <img src={questions[currentQuestion].media} alt={`Question ${currentQuestion + 1}`} />
      <h2>{questions[currentQuestion].question}</h2>
      {showOptions ? (
        <div>
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <p>Options will appear in {30 - timer}s</p>
      )}
      <p>Time Remaining: {timer}s</p>
    </div>
  );
};

export default TestApp;