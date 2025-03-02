import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Vite + React + Tailwind</h1>
      
      <div className="bg-white text-black p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Count: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;
