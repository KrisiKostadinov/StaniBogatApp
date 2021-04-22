import { useState } from 'react';
import './App.css';
import { MoneyList } from './components/MoneyList/MoneyList';
import { Question } from './components/Question/Question';
import CurrentQuestionContext from './Context/CurrentQuestionContext';
import QuestionsContext from './Context/QuestionContext';

function App() {

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questionContext, setQuestionContext] = useState([]);

  return (
    <div className="app">
      <header>
        <CurrentQuestionContext.Provider value={{ currentQuestionNumber, setCurrentQuestionNumber }}>
          <QuestionsContext.Provider value={{ questionContext, setQuestionContext }}>
            <Question />
          </QuestionsContext.Provider>
          <MoneyList currentQuestionNumber={currentQuestionNumber} />
        </CurrentQuestionContext.Provider>
      </header>
    </div>
  );
}

export default App;
