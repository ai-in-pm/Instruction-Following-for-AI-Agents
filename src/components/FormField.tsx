import React from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'number' | 'textarea';
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

export function FormField({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder 
}: FormFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          rows={4}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      )}
    </div>
  );
}