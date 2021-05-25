import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Landing from './components/Landing'
import NavBar from './components/NavBar';


function App() {




  return (
    <>
    <div className="App d-flex mx-auto">
      <NavBar />
      <Landing />
    </div>
    </>
  );
}

export default App;
