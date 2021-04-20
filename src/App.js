import './App.css';
import { MoneyList } from './components/MoneyList/MoneyList';
import { Question } from './components/Question/Question';

function App() {
  return (
    <div className="app">
      <header>
        <Question />
        <MoneyList />
      </header>
    </div>
  );
}

export default App;
