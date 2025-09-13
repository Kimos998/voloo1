
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface SnippetCardProps {
  title: string;
  content: string;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ title, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
        <button
          onClick={handleCopy}
          className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Copy snippet"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
              Copied!
            </span>
          )}
        </button>
      </div>
      <div className="p-4">
        <pre className="text-gray-800 whitespace-pre-wrap font-sans text-base leading-relaxed">{content}</pre>
      </div>
    </div>
  );
};

export default SnippetCard;
