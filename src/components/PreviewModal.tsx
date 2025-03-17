import React from 'react';
import { X } from 'lucide-react';

interface PreviewModalProps {
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function PreviewModal({ content, onClose, onConfirm }: PreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Preview Generated Prompt</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-auto p-4 flex-grow bg-gray-50">
          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
            {content}
          </pre>
        </div>
        <div className="border-t p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}