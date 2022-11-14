export const validateIdFormat = (value: string) => /^[a-zA-Z0-9]{5,30}$/g.test(value);

export const validatePasswordFormat = (value: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,30}$/g.test(value);
