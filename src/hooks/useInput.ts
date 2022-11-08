import { useRef, useState } from 'react';

type useInputType = (value: string) => boolean;

const useInput = (validateFunc: useInputType) => {
  const inputElement = useRef(null);
  const [isValidatedInput, setIsValidatedInput] = useState(false);

  const handleBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsValidatedInput(validateFunc(event.target.value));
  };

  return { inputElement, handleBlurInput, isValidatedInput };
};

export default useInput;
