// Validation
export interface Validatable {
  value: string | number;
  // somente o value é obrigatório, por isso colocamos ? nos outros
  // required: boolean | undefined; ou poderia fazer assim
  required?: boolean;
  minLength?: number; // length of the string
  maxLength?: number;
  min?: number; // limites dos números (entre 1 e 10 por exemplo)
  max?: number;
}

export function validate(validatableIpunt: Validatable) {
  let isValid = true;
  if (validatableIpunt.required) {
    // se required é true
    // if (validatableIpunt.value === 'string') {
    //   isValid = isValid && validatableIpunt.value.trim().length > 0;
    // }
    isValid = isValid && validatableIpunt.value.toString().trim().length !== 0;
    // se for 0, isValid vai se tornar falso
  }
  if (
    // validatableIpunt.minLength != null inclui null e undefined
    // 0 é falsy, isso garante que vamos fazer a verificação mesmo se minLength é 0
    validatableIpunt.minLength != null &&
    typeof validatableIpunt.value === "string"
  ) {
    // se minLength foi definido, temos que checar se a string tem o comprimento mínimo, e se for uma string
    isValid =
      isValid && validatableIpunt.value.length >= validatableIpunt.minLength;
  }
  if (
    validatableIpunt.maxLength != null &&
    typeof validatableIpunt.value === "string"
  ) {
    isValid =
      isValid && validatableIpunt.value.length <= validatableIpunt.maxLength;
  }
  if (
    validatableIpunt.min != null &&
    typeof validatableIpunt.value === "number"
  ) {
    isValid = isValid && validatableIpunt.value >= validatableIpunt.min;
  }
  if (
    validatableIpunt.max != null &&
    typeof validatableIpunt.value === "number"
  ) {
    isValid = isValid && validatableIpunt.value <= validatableIpunt.max;
  }
  return isValid;
}
