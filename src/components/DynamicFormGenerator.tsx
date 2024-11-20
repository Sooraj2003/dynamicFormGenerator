import React, { useState } from 'react';
import JsonEditor from './JsonEditor';
import FormRenderer from './FormRenderer';

interface DynamicFormGeneratorProps {
  mode: boolean; // Dark mode flag
}

const DynamicFormGenerator: React.FC<DynamicFormGeneratorProps> = ({ mode }) => {
  const [formSchema, setFormSchema] = useState<{ formTitle: string; fields: any[] }>({ formTitle: '', fields: [] });

  const handleJsonChange = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      setFormSchema(parsed);
    } catch {
      console.error('Invalid JSON');
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-full ${mode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="w-full md:w-1/2 p-4">
        <JsonEditor onChange={handleJsonChange} mode={mode} />
      </div>
      <div className="w-full md:w-1/2 p-4 border-l">
        <FormRenderer schema={formSchema}  />
      </div>
    </div>
  );
};

export default DynamicFormGenerator;
