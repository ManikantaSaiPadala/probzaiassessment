import React from 'react';
import ChartComponent from './components/ChartComponent';
import './App.css'; 

const App: React.FC = () => {
    
    return (
        <div>
            <div className='head-text'>
              <h1>Charting App</h1>
            </div>
            <ChartComponent />
        </div>
    );
};

export default App;
