export const LENGTH_RGX = new RegExp(/.{8,}$/);
export const SPECIAL_CHARS_RGX = new RegExp(
  /.*[-^$*.[\]{}()?"!@#%&/\,><':;|_~`+=]/
);
export const UPPERCASE_RGX = new RegExp(/.*[A-Z]/);
export const LOWERCASE_RGX = new RegExp(/.*[a-z]/);
export const NUMBER_RGX = new RegExp(/.*\d/);

export const VALID_PASSWORD_RGX = new RegExp(
  `^(?=${[SPECIAL_CHARS_RGX.source, NUMBER_RGX.source, LENGTH_RGX.source, UPPERCASE_RGX.source].join(')(?=')}).*$`
);
