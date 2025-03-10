package com.example.MTG_Mox.validate;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Component;

@Component
public class EmailValidatorJavaImpl implements EmailValidators {
    @Override
    public Boolean validateEmail(String email) {
        EmailValidator validator = EmailValidator.getInstance();
        return validator.isValid(email);
    }
}
