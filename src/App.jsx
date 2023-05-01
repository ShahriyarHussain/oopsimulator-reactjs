import './App.css';
import Projection from './Components/RAComponents/Projection';
import QueryData from './Components/RAComponents/QueryData';
import RaOperation from './Components/RAComponents/RaOperation';
import Selection from './Components/RAComponents/Selection';
import AllTables from './Components/Table/AllTables';

function App() {
  return (
    <div className='ml-10'>
    <AllTables/>
      <QueryData/>
      <Projection/>
      <Selection/>
      <RaOperation/>
    </div>    
  );
}

export default App;
