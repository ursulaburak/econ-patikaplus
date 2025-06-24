import { useQuestion } from "./context/QuestionContext";
import { QuestionProvider } from "./context/QuestionContext";
import "./App.css";
import Question from "./components/Question";
import Start from "./components/Start";
import Result from "./components/Result.jsx";

function App() {
  return (
    <QuestionProvider>
      <QuizContainer />
    </QuestionProvider>
  );
}

function QuizContainer() {
  const { isQuestionActive, isQuestionCompleted } = useQuestion();

  return (
    <div>
      {isQuestionCompleted ? (
        <Result />
      ) : isQuestionActive ? (
        <Question />
      ) : (
        <Start />
      )}
    </div>
  );
}

export default App;