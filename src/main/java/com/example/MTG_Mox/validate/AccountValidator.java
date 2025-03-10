package com.example.MTG_Mox.validate;

import com.example.MTG_Mox.model.User;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class AccountValidator implements ConstraintValidator<AccountConstraint, User> {



    @Override
    public void initialize(AccountConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        boolean valid = true;
        EmailValidators emailValidators = new EmailValidatorJavaImpl();
        if (user.getUsername() == null || user.getUsername().isEmpty() || !emailValidators.validateEmail(user.getUsername())) {
            context.buildConstraintViolationWithTemplate("Invalid email")
                    .addPropertyNode("email")
                    .addConstraintViolation();
            valid = false;
        }
        if (user.getPassword() == null || user.getPassword().length() < 4) {
            context.buildConstraintViolationWithTemplate("Password must be at least 4 characters long.")
                    .addPropertyNode("password")
                    .addConstraintViolation();
            valid = false;
        }
        return valid;

    }
}
