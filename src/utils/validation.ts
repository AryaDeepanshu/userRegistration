const validatePassword = (password: string): boolean => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numericRegex = /[0-9]/;
    const specialSymbolRegex = /[@$!%*?&]/;
  
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasNumeric = numericRegex.test(password);
    const hasSpecialSymbol = specialSymbolRegex.test(password);
    const hasMinimumLength = password.length >= 8;
    console.log(hasUppercase, hasLowercase, hasNumeric, hasSpecialSymbol, hasMinimumLength)
    return hasUppercase && hasLowercase && hasNumeric && hasSpecialSymbol && hasMinimumLength;
  };

  const  validateEmail = (email:string ): boolean => {
    // Regular expression for a valid email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Test the email against the regular expression
  const isValid = emailRegex.test(email);

  return isValid;
  }

export {
    validatePassword,
    validateEmail
}