export function validate(validatableIpunt) {
    let isValid = true;
    if (validatableIpunt.required) {
        isValid = isValid && validatableIpunt.value.toString().trim().length !== 0;
    }
    if (validatableIpunt.minLength != null &&
        typeof validatableIpunt.value === "string") {
        isValid =
            isValid && validatableIpunt.value.length >= validatableIpunt.minLength;
    }
    if (validatableIpunt.maxLength != null &&
        typeof validatableIpunt.value === "string") {
        isValid =
            isValid && validatableIpunt.value.length <= validatableIpunt.maxLength;
    }
    if (validatableIpunt.min != null &&
        typeof validatableIpunt.value === "number") {
        isValid = isValid && validatableIpunt.value >= validatableIpunt.min;
    }
    if (validatableIpunt.max != null &&
        typeof validatableIpunt.value === "number") {
        isValid = isValid && validatableIpunt.value <= validatableIpunt.max;
    }
    return isValid;
}
//# sourceMappingURL=validation.js.map