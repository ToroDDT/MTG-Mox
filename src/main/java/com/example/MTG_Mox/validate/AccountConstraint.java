package com.example.MTG_Mox.validate;

import jakarta.validation.Constraint;

import java.lang.annotation.Documented;

@Documented
@Constraint(validatedBy = AccountValidator.class)
public @interface AccountConstraint {
}
