import * as R from "ramda";

export const invalidFirstName = firstName => {
  return (
    R.isEmpty(firstName) ||
    R.gt(firstName.length, 10) ||
    R.lt(firstName.length, 3)
  );
};

export const invalidLastName = lastName => {
  return (
    R.isEmpty(lastName) || R.gt(lastName.length, 10) || R.lt(lastName.length, 3)
  );
};

const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const invalidEmail = email => {
  return R.isEmpty(email) || R.gt(email.length, 32) || !isValidEmail(email);
};

export const invalidPassword = password => {
  return (
    R.isEmpty(password) || R.lt(password.length, 6) || R.gt(password.length, 10)
  );
};
