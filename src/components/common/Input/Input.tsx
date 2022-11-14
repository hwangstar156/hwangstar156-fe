import { forwardRef, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  inActive: boolean;
  labelText: string;
  cyId: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, inActive, cyId, labelText } = props;

  return (
    <>
      <Label htmlFor={id}>{labelText}</Label>
      <TextInput ref={ref} {...props} />
      <ValidatedMessage isInValidInput={!inActive} data-cy={cyId}>
        {`올바른 ${labelText} 형식으로 입력해주세요.`}
      </ValidatedMessage>
    </>
  );
});

export default Input;

Input.displayName = 'Input';

const Label = styled.label`
  color: #6c6c7d;
  font-size: 13px;
  font-weight: 700;
  margin-top: 15px;
`;

const TextInput = styled.input<{ inActive: boolean }>`
  border: 1px solid #000;
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  border-color: transparent;

  ${({ inActive }) =>
    css`
      background: ${inActive ? '#f7f7fa' : '#FDEDEE'};
    `}
`;

const ValidatedMessage = styled.div<{ isInValidInput: boolean }>`
  color: #ed4e5c;
  font-weight: 400;
  font-size: 13px;
  margin-top: 8px;

  ${({ isInValidInput }) => css`
    opacity: ${isInValidInput ? 1 : 0};
  `}
`;
