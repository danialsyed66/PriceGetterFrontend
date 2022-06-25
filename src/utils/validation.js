export function isValidEmail(value) {
  // eslint-disable-next-line no-useless-escape
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return re.test(String(value).toLowerCase());
}

export function validateEmail(value, setEmailError) {
  if (value === '' || isValidEmail(value)) return setEmailError('');

  setEmailError('Invalid Email');
}

export function validatePassword(value, setPasswordError) {
  if (value.length < 6)
    return setPasswordError('Password must be 6 characters');

  setPasswordError('');
}
