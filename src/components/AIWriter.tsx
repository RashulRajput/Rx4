import React, { useState } from 'react';
import { FileText, Edit, Book, List, Plus } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  structure: string[];
  // Template content will be added here
  content?: string;
}

// Placeholder for templates - will be provided later
const templates: Template[] = [
  {
    id: 'template1',
    name: 'Scientific Research Paper',
    description: 'Standard scientific paper format with abstract, methods, results, and discussion',
    structure: ['Abstract', 'Introduction', 'Methods', 'Results', 'Discussion', 'References'],
  },
  // More templates will be added here
];

const AIWriter: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [content, setContent] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  const handleTemplateSelect = (template: Template) => {
    setActiveTemplate(template);
    setIsWriting(true);
    setCurrentSection(template.structure[0]);
  };

  const startNewPaper = () => {
    setActiveTemplate(null);
    setContent('');
    setIsWriting(false);
  };

  if (!isWriting) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI Research Paper Writer</h1>
          <p className="text-xl text-gray-300">Write research papers with confidence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <button
            onClick={() => setIsWriting(true)}
            className="royal-card p-8 text-left hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Edit className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Start Writing</h3>
            <p className="text-gray-300">Begin with a blank canvas and let AI guide your writing</p>
          </button>

          <button
            onClick={() => setActiveTemplate(templates[0])}
            className="royal-card p-8 text-left hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <List className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Choose a Template</h3>
            <p className="text-gray-300">Start with a pre-defined research paper structure</p>
          </button>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="royal-card p-6 cursor-pointer hover:bg-gray-800 transition-colors"
              >
                <FileText className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                <p className="text-gray-300 mb-4">{template.description}</p>
                <div className="space-y-1">
                  {template.structure.map((section, index) => (
                    <p key={index} className="text-sm text-gray-400">• {section}</p>
                  ))}
                </div>
              </div>
            ))}
            {/* Placeholder for more templates */}
            <div className="royal-card p-6 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500">
              <Plus className="h-8 w-8 mb-2" />
              <p>More templates coming soon</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {activeTemplate ? activeTemplate.name : 'New Research Paper'}
          </h1>
          {activeTemplate && (
            <p className="text-gray-300 mt-2">
              Current section: {currentSection}
            </p>
          )}
        </div>
        <button
          onClick={startNewPaper}
          className="royal-button px-4 py-2"
        >
          Start New Paper
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="col-span-1 royal-card p-4">
          <h3 className="text-lg font-bold text-white mb-4">Sections</h3>
          {activeTemplate ? (
            <div className="space-y-2">
              {activeTemplate.structure.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(section)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    currentSection === section
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">
              <p>Start writing or select a template to begin</p>
            </div>
          )}
        </div>

        {/* Writing Area */}
        <div className="col-span-3">
          <div className="royal-card p-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Start writing your ${currentSection?.toLowerCase() || 'paper'} here...
              
AI will assist you with:
- Research suggestions
- Citation formatting
- Grammar and style
- Logical flow
              
Press Ctrl + Space for AI assistance`}
              className="w-full h-[600px] bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-lg"
            />
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="royal-button px-4 py-2">
                <Book className="h-5 w-5" />
                <span className="ml-2">Add Citation</span>
              </button>
              <button className="royal-button px-4 py-2">
                <Edit className="h-5 w-5" />
                <span className="ml-2">AI Review</span>
              </button>
            </div>
            <button className="royal-button px-4 py-2">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWriter;
