package com.example.MTG_Mox.validate;

import com.example.MTG_Mox.model.Account;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class AccountValidator implements ConstraintValidator<AccountConstraint, Account> {



    @Override
    public void initialize(AccountConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Account account, ConstraintValidatorContext context) {
        boolean valid = true;
        EmailValidators emailValidators = new EmailValidatorJavaImpl();
        if (account.getEmail() == null || account.getEmail().isEmpty() || !emailValidators.validateEmail(account.getEmail())) {
            context.buildConstraintViolationWithTemplate("Invalid email")
                    .addPropertyNode("email")
                    .addConstraintViolation();
            valid = false;
        }
        if (account.getPassword() == null || account.getPassword().length() < 4) {
            context.buildConstraintViolationWithTemplate("Password must be at least 4 characters long.")
                    .addPropertyNode("password")
                    .addConstraintViolation();
            valid = false;
        }
        return valid;

    }
}
