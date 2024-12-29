import React, { useState } from 'react';
import axios from 'axios';
import SolutionDisplay from './SolutionDisplay';

const Home = () => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [solution, setSolution] = useState(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

 // responseFormatter.js
     const formatResponse = (responseString) => {
    try {
      // First, handle the code blocks in the implementation
      const cleanResponse = responseString
        .replace(/```json\n/, '')  // Remove leading ```json
        .replace(/\n```$/, '')     // Remove trailing ```
        .replace(/```cpp\n/g, '')  // Remove cpp code block starts
        .replace(/\n```/g, '');    // Remove code block ends
  
      // Parse the cleaned string to JSON
      const jsonData = JSON.parse(cleanResponse);
  
      // Create the properly formatted object structure
      return {
        problem: "Find the longest common prefix string amongst an array of strings.",
        approaches: jsonData.approaches.map(approach => ({
          name: approach.approach,
          explanation: approach.explanation || "",
          timeComplexity: approach.timeComplexity || "",
          spaceComplexity: approach.spaceComplexity || "",
          implementation: approach.implementation || "",
          limitations: approach.limitations || "",
          tradeoffs: approach.tradeoffs || "",
          bestApproach: approach.bestPossible || "",
          edgeCases: approach.edgeCases || "",
          improvement: approach.improvement || ""
        }))
      };
    } catch (error) {
      console.error('Error formatting response:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("https://algotime.onrender.com", { text });
      if (response.status === 200) {
        const formattedData = formatResponse(response.data);
        console.log(formattedData)
        if (formattedData) {
          setSolution(formattedData);
        } else {
          console.log("Failed to parse the response. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto mb-8">
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Submit Your Coding Problem
            </h2>
            
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={handleChange}
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200 ease-in-out
                           resize-none text-gray-700 text-lg
                           placeholder:text-gray-400"
                  placeholder="Paste your coding problem here..."
                />
                <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                  {text.length} characters
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="w-full py-3 px-4 rounded-lg font-medium text-white
                       bg-blue-500 hover:bg-blue-600 
                       disabled:bg-gray-300 disabled:cursor-not-allowed
                       transition-colors duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Analyze Problem'
              )}
            </button>
          </div>
        </form>
      </div>
      
      {solution && (
        <SolutionDisplay data={solution} />
      )}
    </div>
  );
};

export default Home;