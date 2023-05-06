import './App.css';
import AllTables from './Components/Table/AllTables';
import Navbar from './Components/Navbar/Navbar';
// import JoinOperation from './Components/RAComponents/JoinOperation';

function App() {
  return (
    <div className='ml-10 mr-5'>
    <AllTables/>
    <Navbar/>
    {/* <JoinOperation/> */}
    </div>    
  );
}

export default App;
