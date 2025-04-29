
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: "cpfCnpj" | "phone" | "cep";
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  className?: string;
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  value,
  onChange,
  error = false,
  className,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState("");

  // Apply mask based on input type
  useEffect(() => {
    if (mask === "cpfCnpj") {
      if (value.length <= 11) {
        // CPF: 123.456.789-00
        const cpfMask = value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");
        setDisplayValue(cpfMask);
      } else {
        // CNPJ: 12.345.678/0001-90
        const cnpjMask = value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");
        setDisplayValue(cnpjMask);
      }
    } else if (mask === "phone") {
      // Phone: (11) 98765-4321
      const phoneMask = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
      setDisplayValue(phoneMask);
    } else if (mask === "cep") {
      // CEP: 12345-678
      const cepMask = value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
      setDisplayValue(cepMask);
    }
  }, [value, mask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digits = inputValue.replace(/\D/g, "");
    onChange(digits);
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      className={cn(error && "credit-input-mask-error", className)}
      {...props}
    />
  );
};

export default MaskedInput;
