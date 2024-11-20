import React, { useState } from 'react';
const ReactJson =
  typeof window !== 'undefined' ? require('react-json-view').default : null;


interface JsonEditorProps {
  onChange: (json: string) => void;
  mode: boolean; // Dark mode flag as boolean
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange, mode }) => {
  const [json, setJson] = useState<string>(''); // JSON string state
  const [error, setError] = useState<string>(''); // Error state
  const [isCopied, setIsCopied] = useState<boolean>(false); // State for copy status

  // Define a light mode theme
  const lightModeTheme = {
    base00: '#ffffff', // background color
    base01: '#f0f0f0',
    base02: '#e0e0e0',
    base03: '#c0c0c0',
    base04: '#a0a0a0',
    base05: '#000000', // text color
    base06: '#303030',
    base07: '#404040',
    base08: '#FF6347', // color for strings
    base09: '#FFD700', // color for numbers
    base0A: '#32CD32', // color for booleans
    base0B: '#00CED1', // color for null
    base0C: '#8A2BE2', // color for keys
    base0D: '#D2691E',
    base0E: '#FF4500',
    base0F: '#DAA520',
  };

  // Define a dark mode theme
  const darkModeTheme = {
    base00: '#2d2d2d', // background color
    base01: '#3e3e3e',
    base02: '#4e4e4e',
    base03: '#5e5e5e',
    base04: '#6e6e6e',
    base05: '#ffffff', // text color
    base06: '#f0f0f0',
    base07: '#e0e0e0',
    base08: '#FF6347', // color for strings
    base09: '#FFD700', // color for numbers
    base0A: '#32CD32', // color for booleans
    base0B: '#00CED1', // color for null
    base0C: '#8A2BE2', // color for keys
    base0D: '#D2691E',
    base0E: '#FF4500',
    base0F: '#DAA520',
  };

  // Use the correct theme based on dark mode
  const theme = mode ? darkModeTheme : lightModeTheme;

  // Handle changes in the JSON editor
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJson = e.target.value;
    setJson(newJson);
    onChange(newJson);
    setError(''); // Reset error on input change
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(json).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    }).catch(() => {
      setError('Failed to copy JSON');
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left side: JSON editor */}
        <div className="w-full lg:w-1/2 p-4">
          <textarea
            className="w-full h-[100px] p-2 border rounded text-black"
            value={json}
            onChange={handleInputChange}
            placeholder="Enter JSON schema here..."
          />
          
          {/* Copy button */}
          <button 
            onClick={handleCopyJson}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isCopied ? 'Copied!' : 'Copy JSON'}
          </button>

          {/* Show error message only after submission */}
          {error && (
            <div className="text-red-500 mt-2">
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Right side: JSON Viewer */}
        <div className="w-full lg:w-1/2 p-4 border-l lg:border-l-2">
          {json && !error ? (
            <ReactJson
              src={JSON.parse(json)}
              collapsed={false}
              theme={theme} // Apply the dynamic theme
            />
          ) : (
            <div className="text-red-500">Invalid JSON. Please check the format.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;
