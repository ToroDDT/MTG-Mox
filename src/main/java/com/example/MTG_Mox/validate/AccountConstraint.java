package com.example.MTG_Mox.validate;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = AccountValidator.class)
@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AccountConstraint {
    String message () default "Invalid data";
    Class<?> [] groups() default {};
    Class<? extends Payload> [] payload() default {};
}
