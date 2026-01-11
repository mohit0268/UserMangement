import { type ReactNode } from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  submitButton?: ReactNode;
}

const Form = ({ onSubmit, children, submitButton }: FormProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {children}
    {submitButton || <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit</button>}
  </form>
);

export default Form;