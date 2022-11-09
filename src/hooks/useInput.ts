import { useRef, useState } from 'react';

type useInputType = (value: string) => boolean;

const useInput = (validateFunc: useInputType) => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const [isValidatedInput, setIsValidatedInput] = useState(false);

  const handleBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsValidatedInput(validateFunc(event.target.value));
  };

  return { ref: inputElement, onBlur: handleBlurInput, inActive: isValidatedInput };
};

export default useInput;
