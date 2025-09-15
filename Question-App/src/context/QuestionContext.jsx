import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { questions } from "../data/data"; 

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [isQuestionActive, setIsQuestionActive] = useState(false);
  const [isQuestionCompleted, setIsQuestionCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [timer, setTimer] = useState(30); 

  useEffect(() => {
    if (isQuestionActive) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(interval);
          nextQuestion(); 
          return 0;
        });
      }, 1000);

      // Show options after 4 seconds
      const optionsTimeout = setTimeout(() => {
        setIsOptionsVisible(true);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(optionsTimeout);
      };
    }
  }, [isQuestionActive, currentQuestionIndex]);

  const startQuestion = () => {
    setIsQuestionActive(true);
    setIsQuestionCompleted(false);
    setCurrentQuestionIndex(0);
    setResults([]);
    setTimer(30);
    setIsOptionsVisible(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsQuestionActive(false); 
      setIsQuestionCompleted(true); 
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30); 
      setIsOptionsVisible(false);
    }
  };

  const answerQuestion = (selectedOption, question) => {
    const isCorrect = selectedOption === question.answer; 

    setResults((prevResults) => [
      ...prevResults,
      {
        question: question.question,
        selected: selectedOption,
        correct: isCorrect,
        correctAnswer: question.answer,
      },
    ]);

    nextQuestion();
  };

  // Toggle the visibility of the answers
  const toggleShowAnswers = () => {
    setShowAnswers((prev) => !prev);
  };

  const data = {
    isQuestionActive,
    isQuestionCompleted,
    currentQuestionIndex,
    startQuestion,
    answerQuestion,
    results,
    timer,
    isOptionsVisible,
    showAnswers,
    toggleShowAnswers,
  };

  return (
    <QuestionContext.Provider value={data}>
      {children}
    </QuestionContext.Provider>
  );
};

QuestionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useQuestion = () => useContext(QuestionContext);
