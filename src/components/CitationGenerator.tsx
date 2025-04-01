import React, { useState } from 'react';
import { Book, Link, Hash, Search, Copy, RefreshCw } from 'lucide-react';

type InputType = 'title' | 'url' | 'doi';

interface CitationData {
  authors: string[];
  title: string;
  journal?: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
}

const CitationGenerator: React.FC = () => {
  const [inputType, setInputType] = useState<InputType>('title');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [citation, setCitation] = useState('');
  const [citationData, setCitationData] = useState<CitationData | null>(null);

  const generateCitation = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    try {
      // Simulate API call to fetch paper metadata
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you would typically make an API call to fetch paper metadata
      // const response = await fetch('/api/paper-metadata', {
      //   method: 'POST',
      //   body: JSON.stringify({ type: inputType, value: input })
      // });
      // const data = await response.json();

      // For demonstration, we'll create sample data
      const sampleData: CitationData = {
        authors: ['Smith, J.', 'Johnson, A.'],
        title: 'Understanding Citation Patterns in Academic Research',
        journal: 'Journal of Academic Publishing',
        year: 2024,
        volume: '15',
        issue: '2',
        pages: '123-145',
        doi: '10.1234/sample.doi',
        url: 'https://example.com/paper'
      };

      setCitationData(sampleData);
      
      // Generate APA citation
      const citation = generateAPACitation(sampleData);
      setCitation(citation);
    } catch (error) {
      console.error('Error generating citation:', error);
      setCitation('Error generating citation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateAPACitation = (data: CitationData): string => {
    const authors = data.authors.length > 0
      ? data.authors.length > 1
        ? `${data.authors.slice(0, -1).join(', ')}, & ${data.authors[data.authors.length - 1]}`
        : data.authors[0]
      : 'No author';

    let citation = `${authors} (${data.year}). ${data.title}`;

    if (data.journal) {
      citation += `. ${data.journal}`;
      if (data.volume) {
        citation += `, ${data.volume}`;
        if (data.issue) {
          citation += `(${data.issue})`;
        }
      }
      if (data.pages) {
        citation += `, ${data.pages}`;
      }
    }

    citation += '.';

    if (data.doi) {
      citation += ` https://doi.org/${data.doi}`;
    } else if (data.url) {
      citation += ` ${data.url}`;
    }

    return citation;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(citation);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">APA Citation Generator</h1>
        <p className="text-gray-300">Generate accurate APA citations from paper metadata</p>
      </div>

      <div className="space-y-6">
        {/* Input Type Selection */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setInputType('title')}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              inputType === 'title'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Book className="h-4 w-4" />
            <span>Title</span>
          </button>
          <button
            onClick={() => setInputType('url')}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              inputType === 'url'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Link className="h-4 w-4" />
            <span>URL</span>
          </button>
          <button
            onClick={() => setInputType('doi')}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              inputType === 'doi'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Hash className="h-4 w-4" />
            <span>DOI</span>
          </button>
        </div>

        {/* Input Field */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                inputType === 'title'
                  ? 'Enter paper title...'
                  : inputType === 'url'
                  ? 'Enter paper URL...'
                  : 'Enter DOI...'
              }
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={generateCitation}
            disabled={!input.trim() || isLoading}
            className="royal-button px-6 py-3 flex items-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>Generate</span>
          </button>
        </div>

        {/* Citation Result */}
        {citation && (
          <div className="space-y-6">
            <div className="royal-card p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">APA Citation</h3>
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-white"
                  title="Copy citation"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{citation}</p>
            </div>

            {/* Paper Details */}
            {citationData && (
              <div className="royal-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Paper Details</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-gray-400">Authors:</span> {citationData.authors.join(', ')}</p>
                  <p><span className="text-gray-400">Title:</span> {citationData.title}</p>
                  {citationData.journal && (
                    <p><span className="text-gray-400">Journal:</span> {citationData.journal}</p>
                  )}
                  <p><span className="text-gray-400">Year:</span> {citationData.year}</p>
                  {citationData.volume && (
                    <p><span className="text-gray-400">Volume:</span> {citationData.volume}</p>
                  )}
                  {citationData.issue && (
                    <p><span className="text-gray-400">Issue:</span> {citationData.issue}</p>
                  )}
                  {citationData.pages && (
                    <p><span className="text-gray-400">Pages:</span> {citationData.pages}</p>
                  )}
                  {citationData.doi && (
                    <p><span className="text-gray-400">DOI:</span> {citationData.doi}</p>
                  )}
                  {citationData.url && (
                    <p><span className="text-gray-400">URL:</span> {citationData.url}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitationGenerator;
