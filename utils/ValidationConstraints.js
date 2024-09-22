import { validate } from 'validate.js';

const extractErrorMessage = (validationResult, id) => {
  return validationResult && validationResult[id]
    ? validationResult[id].map((error) => error.split(' ').slice(1).join(' '))
    : null;
};

export const validateString = (id, value) => {
  const constraints = {
    presence: {
      allowEmpty: false,
      message: 'No puede estar vacío',
    },
  };

  if (value !== '') {
    constraints.format = {
      pattern: '.+',
      flags: 'i',
      message: 'Valor no puede ser vacío',
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return extractErrorMessage(validationResult, id);
};

export const validateEmail = (id, value) => {
  const constraints = {
    presence: {
      allowEmpty: false,
      message: 'No puede estar vacío',
    },
  };

  if (value !== '') {
    constraints.email = {
      message: 'Correo electrónico no válido',
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return extractErrorMessage(validationResult, id);
};

export const validatePassword = (id, value) => {
  const constraints = {
    presence: {
      allowEmpty: false,
      message: 'No puede estar vacío',
    },
  };

  if (value !== '') {
    constraints.length = {
      minimum: 6,
      message: 'Debe tener al menos 6 caracteres',
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return extractErrorMessage(validationResult, id);
};

export const validateCreditCardNumber = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false, message: 'No puede estar vacío' },
    format: { pattern: /^(?:\d{4}-){3}\d{4}$|^\d{16}$/, message: 'Número de tarjeta inválido.' },
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return extractErrorMessage(validationResult, id);
};

export const validateCVV = (id, value) => {
  const constraints = {
    presence: {
      allowEmpty: false,
      message: 'No puede estar vacío',
    },
    format: {
      pattern: /^[0-9]{3,4}$/,
      message: 'CVV inválido.',
    },
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return extractErrorMessage(validationResult, id);
};

export const validateExpiryDate = (id, value) => {
  const constraints = {
    presence: {
      allowEmpty: false,
      message: 'No puede estar vacío',
    },
    format: {
      pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      message: 'Fecha de expiración inválida. Formato: MM/YY',
    },
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return extractErrorMessage(validationResult, id);
};
