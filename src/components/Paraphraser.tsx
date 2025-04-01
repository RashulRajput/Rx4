import React, { useState } from 'react';
import { Copy, RefreshCw, Wand2 } from 'lucide-react';

const paraphrasingStyles = [
  { id: 'academic', name: 'Academic', description: 'Formal and scholarly tone' },
  { id: 'simple', name: 'Simple', description: 'Clear and easy to understand' },
  { id: 'creative', name: 'Creative', description: 'Unique and engaging style' },
  { id: 'professional', name: 'Professional', description: 'Business and technical writing' }
];

const Paraphraser: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('academic');
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [wordCount, setWordCount] = useState({ input: 0, output: 0 });

  const handleTextChange = (text: string) => {
    setInputText(text);
    setWordCount(prev => ({
      ...prev,
      input: text.trim().split(/\s+/).filter(Boolean).length
    }));
  };

  const handleParaphrase = async () => {
    if (!inputText.trim()) return;

    setIsParaphrasing(true);
    
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you would typically make an API call to your AI service
      // const response = await fetch('/api/paraphrase', {
      //   method: 'POST',
      //   body: JSON.stringify({ text: inputText, style: selectedStyle })
      // });
      // const data = await response.json();
      
      // For demonstration, we'll just modify the text slightly
      const paraphrasedText = `Here is a paraphrased version of your text in ${selectedStyle} style:\n\n${inputText
        .split('.')
        .map(sentence => sentence.trim())
        .filter(Boolean)
        .map(sentence => {
          const words = sentence.split(' ');
          return words.reverse().join(' ');
        })
        .join('. ')}`;
      
      setOutputText(paraphrasedText);
      setWordCount(prev => ({
        ...prev,
        output: paraphrasedText.trim().split(/\s+/).filter(Boolean).length
      }));
    } catch (error) {
      console.error('Error paraphrasing text:', error);
    } finally {
      setIsParaphrasing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Paraphraser</h1>
        <p className="text-gray-300">Make your academic writing clear and original</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Original Text</h2>
            <span className="text-sm text-gray-400">
              {wordCount.input} words
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your text here to paraphrase..."
            className="w-full h-[300px] bg-gray-800 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {paraphrasingStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-3 py-1.5 rounded text-sm ${
                    selectedStyle === style.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  title={style.description}
                >
                  {style.name}
                </button>
              ))}
            </div>
            <button
              onClick={handleParaphrase}
              disabled={!inputText.trim() || isParaphrasing}
              className="royal-button px-4 py-2 flex items-center space-x-2 disabled:opacity-50"
            >
              {isParaphrasing ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <Wand2 className="h-5 w-5" />
              )}
              <span>Paraphrase</span>
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Paraphrased Text</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {wordCount.output} words
              </span>
              {outputText && (
                <button
                  onClick={() => handleCopy(outputText)}
                  className="text-gray-400 hover:text-white"
                  title="Copy to clipboard"
                >
                  <Copy className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          <div className="w-full h-[300px] bg-gray-800 rounded-lg p-4 overflow-y-auto">
            {outputText ? (
              <p className="text-white whitespace-pre-wrap">{outputText}</p>
            ) : (
              <p className="text-gray-500 italic">
                Paraphrased text will appear here...
              </p>
            )}
          </div>
          <div className="text-sm text-gray-400">
            <p>
              Selected style: <span className="text-purple-400">{selectedStyle}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paraphraser;
