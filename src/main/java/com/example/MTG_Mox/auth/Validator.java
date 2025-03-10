package com.example.MTG_Mox.auth;

import static org.aspectj.weaver.MemberImpl.method;

public interface Validator {
    Boolean validate(String string1, String string2);

}


// When user forgets password
// Prompt user to for email
// check if email exists
// display modal telling if email exists they will be receiving a email
// send an email with a link that contains a token
// User will be redirected to create a new password
// User will be prompted to add a new password
        // Prompt user to add password
        // Prompt user to confirm password
// If the password matches redirect user to login
// update the password in the database
// If the password does not match
// Notify the user the errors that occured
// Modify the response entity to show what errors occured