// import React, { useState, useCallback, useEffect } from 'react';
// import { ArrowUturnLeftIcon, ArrowUturnRightIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

// // A custom hook for managing state history (undo/redo functionality)
// const useHistory = (initialState) => {
//   const [history, setHistory] = useState([initialState]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const setState = (newState, overwrite = false) => {
//     // If overwrite is true, we replace the latest entry.
//     // Otherwise, we create a new entry.
//     const newHistory = overwrite
//       ? [...history.slice(0, currentIndex), newState]
//       : [...history.slice(0, currentIndex + 1), newState];

//     setHistory(newHistory);
//     setCurrentIndex(newHistory.length - 1);
//   };

//   const undo = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const redo = () => {
//     if (currentIndex < history.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const reset = () => {
//     setCurrentIndex(0);
//   };

//   return {
//     state: history[currentIndex],
//     setState,
//     undo,
//     redo,
//     reset,
//     canUndo: currentIndex > 0,
//     canRedo: currentIndex < history.length - 1,
//   };
// };

// // --- Main App Component ---
// export default function App() {
//   const initialText = "Fiddle is an AI-native design tool that helps you go from idea to a high-fidelity prototype in minutes.";
  
//   // State management using our custom hook
//   const { state: text, setState: setText, undo, redo, reset, canUndo, canRedo } = useHistory(initialText);
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // --- Persistence Logic ---
//   // Load state from localStorage on initial render
//   useEffect(() => {
//     try {
//       const savedState = localStorage.getItem('tone-picker-text');
//       if (savedState) {
//         setText(savedState, true); // Overwrite initial state
//       }
//     } catch (e) {
//       console.error("Failed to load state from localStorage", e);
//     }
//   }, []);

//   // Save state to localStorage whenever the text changes
//   useEffect(() => {
//     try {
//       localStorage.setItem('tone-picker-text', text);
//     } catch(e) {
//       console.error("Failed to save state to localStorage", e);
//     }
//   }, [text]);


//   // --- API Call Logic ---
//   const handleToneChange = useCallback(async (tone) => {
//     if (isLoading) return;
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Backend URL should be in an environment variable for deployment
//       const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/transform-tone';
      
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text, tone }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setText(data.transformedText);

//     } catch (err) {
//       console.error('API call failed:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [text, isLoading, setText]);


//   const toneMatrix = [
//     ['More Professional & More Confident', 'More Confident', 'More Confident & More Casual'],
//     ['More Professional', 'Neutral (Original Tone)', 'More Casual'],
//     ['More Professional & More Friendly', 'More Friendly', 'More Friendly & More Casual'],
//   ];

//   return (
//     <div className="bg-gray-900 min-h-screen text-white font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center">
//       <div className="w-full max-w-6xl mx-auto">
//         <header className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-100">Tone Picker Text Tool</h1>
//           <p className="text-gray-400 mt-2">Adjust the tone of your text with the power of AI.</p>
//         </header>

//         <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
//           {/* Left Side: Text Editor and Controls */}
//           <div className="lg:col-span-3 bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Your Text</h2>
//               <div className="flex items-center space-x-2">
//                 <ControlButton onClick={undo} disabled={!canUndo || isLoading} aria-label="Undo">
//                   <ArrowUturnLeftIcon className="h-5 w-5" />
//                 </ControlButton>
//                 <ControlButton onClick={redo} disabled={!canRedo || isLoading} aria-label="Redo">
//                   <ArrowUturnRightIcon className="h-5 w-5" />
//                 </ControlButton>
//                 <ControlButton onClick={reset} disabled={!canUndo || isLoading} aria-label="Reset to Original">
//                   <ArrowPathIcon className="h-5 w-5" />
//                 </ControlButton>
//               </div>
//             </div>
//             <div className="relative flex-grow">
//               <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value, true)} // Overwrite current state on edit
//                 className="w-full h-full min-h-[300px] bg-gray-900 text-gray-200 p-4 rounded-md border-2 border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
//                 placeholder="Enter your text here..."
//               />
//               {isLoading && <LoadingSpinner />}
//             </div>
//           </div>

//           {/* Right Side: Tone Picker */}
//           <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-center">Adjust Tone</h2>
//             <div className="grid grid-cols-3 gap-3 aspect-square">
//               {toneMatrix.flat().map((tone, index) => (
//                 <ToneButton key={index} tone={tone} onClick={handleToneChange} disabled={isLoading} />
//               ))}
//             </div>
//              {error && (
//               <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md flex items-start space-x-3 text-red-200">
//                 <ExclamationTriangleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="font-semibold">Error</p>
//                   <p className="text-sm">{error}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// // --- Helper Components ---

// const ControlButton = ({ children, ...props }) => (
//   <button
//     {...props}
//     className="p-2 rounded-md bg-gray-700 hover:bg-indigo-600 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//   >
//     {children}
//   </button>
// );

// const ToneButton = ({ tone, onClick, disabled }) => {
//   const isCenter = tone === 'Neutral (Original Tone)';
//   const baseClasses = "flex items-center justify-center text-center p-2 rounded-lg text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500";
//   const styleClasses = isCenter 
//     ? "bg-gray-600 cursor-default"
//     : "bg-gray-700 hover:bg-indigo-600 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed";

//   return (
//     <button
//       onClick={() => !isCenter && onClick(tone)}
//       disabled={disabled || isCenter}
//       className={`${baseClasses} ${styleClasses}`}
//     >
//       {tone.replace(' (Original Tone)', '')}
//     </button>
//   );
// };

// const LoadingSpinner = () => (
//   <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center rounded-md backdrop-blur-sm">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
//   </div>
// );






import React, { useState, useCallback, useEffect } from 'react';
import { ArrowUturnLeftIcon, ArrowUturnRightIcon, ArrowPathIcon, ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/solid';

// A custom hook for managing state history (undo/redo functionality)
const useHistory = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setState = (newState, overwrite = false) => {
    const newHistory = overwrite
      ? [...history.slice(0, currentIndex), newState]
      : [...history.slice(0, currentIndex + 1), newState];

    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
  };

  return {
    state: history[currentIndex],
    setState,
    undo,
    redo,
    reset,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
};

// --- Main App Component ---
export default function App() {
  const initialText = "Fiddle is an AI-native design tool that helps you go from idea to a high-fidelity prototype in minutes.";
  
  const { state: text, setState: setText, undo, redo, reset, canUndo, canRedo } = useHistory(initialText);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Persistence Logic ---
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('tone-picker-text');
      if (savedState) {
        setText(savedState, true);
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tone-picker-text', text);
    } catch(e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [text]);


  // --- API Call Logic ---
  const handleToneChange = useCallback(async (tone) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/transform-tone';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, tone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setText(data.transformedText);

    } catch (err) {
      console.error('API call failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [text, isLoading, setText]);

  const toneMatrix = [
    ['More Professional & More Confident', 'More Confident', 'More Confident & More Casual'],
    ['More Professional', 'Neutral', 'More Casual'],
    ['More Professional & More Friendly', 'More Friendly', 'More Friendly & More Casual'],
  ];

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center selection:bg-indigo-500/30">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 pb-2">
            AI Tone Picker
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            Refine your writing with the perfect tone. Simply input your text and use the picker to adjust it instantly.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl shadow-slate-900/50 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-200">Editor</h2>
              <div className="flex items-center space-x-2">
                <ControlButton onClick={undo} disabled={!canUndo || isLoading} aria-label="Undo">
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </ControlButton>
                <ControlButton onClick={redo} disabled={!canRedo || isLoading} aria-label="Redo">
                  <ArrowUturnRightIcon className="h-5 w-5" />
                </ControlButton>
                <ControlButton onClick={reset} disabled={!canUndo || isLoading} aria-label="Reset to Original">
                  <ArrowPathIcon className="h-5 w-5" />
                </ControlButton>
              </div>
            </div>
            <div className="relative flex-grow">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value, true)}
                className="w-full h-full min-h-[350px] bg-slate-900/70 text-slate-200 p-4 rounded-md border-2 border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none text-base leading-relaxed"
                placeholder="Enter your text here..."
              />
              {isLoading && <LoadingSpinner />}
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl shadow-slate-900/50 p-6">
            <h2 className="text-xl font-semibold mb-2 text-center text-slate-200">Adjust Tone</h2>
            <div className="flex flex-col items-center">
                <p className="text-sm font-medium text-slate-400 mb-2">More Confident</p>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-slate-400 -rotate-90">Professional</p>
                    <div className="grid grid-cols-3 gap-3">
                        {toneMatrix.flat().map((tone, index) => (
                            <ToneButton key={index} tone={tone} onClick={handleToneChange} disabled={isLoading} />
                        ))}
                    </div>
                    <p className="text-sm font-medium text-slate-400 -rotate-90">Casual</p>
                </div>
                <p className="text-sm font-medium text-slate-400 mt-2">More Friendly</p>
            </div>
            {error && <ErrorMessage message={error} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Helper Components ---
const ControlButton = ({ children, ...props }) => (
  <button
    {...props}
    className="p-2 rounded-md bg-slate-700 hover:bg-indigo-600 disabled:bg-slate-600/50 disabled:text-slate-400 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-110 active:scale-95"
  >
    {children}
  </button>
);

const ToneButton = ({ tone, onClick, disabled }) => {
  const isCenter = tone === 'Neutral';
  const baseClasses = "flex items-center justify-center text-center p-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-400 w-20 h-20 md:w-24 md:h-24";
  const styleClasses = isCenter 
    ? "bg-slate-700/50 border border-slate-600 cursor-default text-slate-300"
    : "bg-gradient-to-br from-slate-600 to-slate-700 border border-slate-500 text-slate-200 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed disabled:transform-none";

  return (
    <button
      onClick={() => !isCenter && onClick(tone)}
      disabled={disabled || isCenter}
      className={`${baseClasses} ${styleClasses}`}
    >
      {tone.replace(' (Original Tone)', '')}
    </button>
  );
};

const LoadingSpinner = () => (
  <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center rounded-md backdrop-blur-sm z-10">
    <SparklesIcon className="h-8 w-8 text-indigo-400 animate-pulse" />
    <p className="text-slate-300 mt-2 text-sm animate-pulse">Adjusting tone...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3 text-red-300 animate-fade-in">
    <ExclamationTriangleIcon className="h-6 w-6 mt-0.5 flex-shrink-0 text-red-400" />
    <div>
      <p className="font-bold">An Error Occurred</p>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);


