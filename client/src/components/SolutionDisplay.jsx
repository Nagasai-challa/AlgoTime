import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Code, AlertCircle, Zap } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';

// Register the C++ language
SyntaxHighlighter.registerLanguage('cpp', cpp);

const SolutionDisplay = ({ data }) => {
  const [expandedApproach, setExpandedApproach] = useState(null);
  
  const toggleApproach = (index) => {
    setExpandedApproach(expandedApproach === index ? null : index);
  };

  const formatCode = (code) => {
    return code.replace(/```(\w+\n|\n)?|```$/g, '').trim();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Problem Statement */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Problem</h1>
        <p className="text-gray-700">{data.problem}</p>
      </div>

      {/* Solutions */}
      <div className="space-y-4">
        {data.approaches.map((approach, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => toggleApproach(index)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {index === 0 && <AlertCircle className="text-red-500" />}
                {index === 1 && <Clock className="text-yellow-500" />}
                {index === 2 && <Zap className="text-green-500" />}
                <h2 className="text-lg font-semibold text-gray-800">{approach.name}</h2>
              </div>
              {expandedApproach === index ? (
                <ChevronUp className="text-gray-500" />
              ) : (
                <ChevronDown className="text-gray-500" />
              )}
            </button>

            {expandedApproach === index && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                {/* Explanation */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Explanation</h3>
                  <p className="text-gray-600">{approach.explanation}</p>
                </div>

                {/* Complexity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Time Complexity</h3>
                    <p className="text-gray-600">{approach.timeComplexity}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Space Complexity</h3>
                    <p className="text-gray-600">{approach.spaceComplexity}</p>
                  </div>
                </div>

                {/* Implementation */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Implementation</h3>
                  <SyntaxHighlighter 
                    language="cpp"
                    style={docco}
                    customStyle={{
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      backgroundColor: 'white',
                    }}
                    className="overflow-x-auto"
                  >
                    {formatCode(approach.implementation)}
                  </SyntaxHighlighter>
                </div>

                {/* Additional Info */}
                {approach.limitations && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Limitations</h3>
                    <p className="text-gray-600">{approach.limitations}</p>
                  </div>
                )}
                {approach.tradeoffs && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Trade-offs</h3>
                    <p className="text-gray-600">{approach.tradeoffs}</p>
                  </div>
                )}
                {approach.bestApproach && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Why Best Approach</h3>
                    <p className="text-gray-600">{approach.bestApproach}</p>
                  </div>
                )}
                {approach.edgeCases && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Edge Cases</h3>
                    <p className="text-gray-600">{approach.edgeCases}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionDisplay;