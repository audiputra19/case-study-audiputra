import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routers/router';
import { ApiProvider } from './services/apiEmployees';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
