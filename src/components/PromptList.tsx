import React from 'react';
import { ListChecks } from 'lucide-react';
import type { ExamplePrompt } from '../types';

interface PromptListProps {
  prompts: ExamplePrompt[];
  onSelect: (config: ExamplePrompt['config']) => void;
}

export function PromptList({ prompts, onSelect }: PromptListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Pre-generated Prompts</h2>
      </div>
      <div className="grid gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt.config)}
            className="text-left p-4 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">{prompt.description}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {prompt.config.context}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}