import './App.css';
import SpendMoney from './components/SpendMoney';
import Header from './components/Header';
import Receipt from './components/Receipt';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className='App'>
      <Header/>
      <SpendMoney/>
      <Receipt/>
    </div>
    
  );
}

export default App;
