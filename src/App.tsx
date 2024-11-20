import  { useState } from 'react';
import DynamicFormGenerator from './components/DynamicFormGenerator';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`h-[5000px] ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 px-2 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Toggle Dark Mode
      </button>
      <DynamicFormGenerator mode={darkMode}/>
    </div>
  );
};

export default App;
