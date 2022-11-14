import { useRef, useState } from 'react';

type UseInputType = (value: string) => boolean;

const useInput = (validateFunc: UseInputType) => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const [isValidatedInput, setIsValidatedInput] = useState(false);

  const handleBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsValidatedInput(validateFunc(event.target.value));
  };

  return { ref: inputElement, onBlur: handleBlurInput, inActive: isValidatedInput };
};

export default useInput;
