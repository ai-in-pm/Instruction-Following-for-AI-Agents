import React from 'react';
import { Settings2 } from 'lucide-react';

interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ConfigSection({ title, children }: ConfigSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}