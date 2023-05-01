import './App.css';
import Projection from './Components/RAComponents/Projection';
import QueryData from './Components/RAComponents/QueryData';
import Selection from './Components/RAComponents/Selection';
// import Selection from './Components/RAComponents/Selection';
// import Table from './Components/Table/Table';

function App() {
  return (
    <div>
      <QueryData/>
      <Projection/>
      <Selection/>
    </div>    
    
    // <Table/>
  );
}

export default App;
