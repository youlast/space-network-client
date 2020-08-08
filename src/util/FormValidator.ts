export default class FormValidator {
  /**
   * Validates:
   *  - if in password is min 1 capital letter
   *  - if in password is min 1 digit
   *  - if password length more than required
   *
   * @return {String|null} error string. Possible messages:
   *  - no_capital
   *  - no_number
   *  - small_length
   */
  static validatePassword(
    password: string,
    shouldBeCapitalLetter: boolean,
    shouldBeAnyNumber: boolean,
    minPasswordLength?: number,
  ): 'no_capital'|'no_number'|'small_length'|undefined {
    if (shouldBeCapitalLetter && !password.match(/[A-Z]/)) {
      return 'no_capital';
    }

    if (shouldBeAnyNumber && !password.match(/[0-9]/)) {
      return 'no_number';
    }

    if (minPasswordLength && password.length < minPasswordLength) {
      return 'small_length';
    }

    return undefined;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }

  static isValidNumber(number: string): boolean {
    const numberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return numberRegex.test(number);
  }
}
