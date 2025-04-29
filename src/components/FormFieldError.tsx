
import React from "react";

interface FormFieldErrorProps {
  error?: string;
}

const FormFieldError: React.FC<FormFieldErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <p className="text-sm font-medium text-credit-red mt-1 ml-1">{error}</p>
  );
};

export default FormFieldError;
