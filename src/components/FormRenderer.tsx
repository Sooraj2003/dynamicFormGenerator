import React from 'react';
import { useForm } from 'react-hook-form';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

const FormRenderer: React.FC<{ schema: { formTitle: string; fields: FormField[] } }> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data);
  };

  // Function to handle download of form data as JSON
  const handleDownload = () => {
    const data = getValues(); // Get all form data as an object
    const jsonData = JSON.stringify(data, null, 2); // Convert to JSON string with indentation for readability

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create a link element for downloading the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form_submission.json'; // Filename for the downloaded file
    link.click(); // Trigger the download
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-bold text-center sm:text-3xl">{schema.formTitle}</h1>
        {schema.fields.map((field) => (
          <div key={field.id} className="w-full sm:w-3/4 lg:w-1/2 mx-auto">
            <label className="block font-medium">{field.label}</label>
            {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
              <input
                type={field.type}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                })}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded text-black mt-2"
              />
            ) : field.type === 'select' ? (
              <select {...register(field.id, { required: field.required })} className="w-full p-2 border rounded text-black mt-2">
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value} className="text-black">
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}
            {errors[field.id] && <p className="text-red-500 mt-1">{field.validation?.message || 'This field is required'}</p>}
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button type="submit" className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
        </div>
      </form>

      {/* Download JSON Button */}
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleDownload}
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
        >
          Download Form Submission as JSON
        </button>
      </div>
    </div>
  );
};

export default FormRenderer;
