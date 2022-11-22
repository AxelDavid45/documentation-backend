export const passwordStructure =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export function passwordValidator(passwordToValidate: unknown) {
  if (!passwordToValidate || typeof passwordToValidate !== 'string') {
    throw new Error('argument must be string');
  }

  return passwordStructure.test(passwordToValidate);
}
