package com.example.MTG_Mox;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.MTG_Mox.advice.UserAlreadyExistsException;
import com.example.MTG_Mox.controller.AccountController;
import com.example.MTG_Mox.model.Role;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.repo.AccountRepository;
import com.example.MTG_Mox.service.AccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Validator;
import org.junit.jupiter.api.Assertions;
import java.util.*;

@SpringBootTest
class MtgMoxApplicationTests {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountService accountService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Autowired
    private Validator validator;
    @Autowired
    private AccountController accountController;

    @Test
    void contextLoads() throws Exception {
        assertThat(accountController).isNotNull();
    }

    @Test
    void shouldCreateNewUser() {
        Set<Role> userSet = new HashSet<>();
        userSet.add(new Role("User"));
        var test = new User("Deltoro1999@icloud.com", "password", userSet);
        assertThat(test).isNotNull();
        assertThat(test.getUsername()).isEqualTo("Deltoro1999@icloud.com");
        assertThat(test.getRoles()).contains(new Role("User"));
    }

    @Test
    public void testValidUser() {
        User validUser = new User("valid.email@example.com", "validPassword");
        BeanPropertyBindingResult result = new BeanPropertyBindingResult(validUser, "user");

        validator.validate(validUser, result);
        assertFalse(result.hasErrors(), result.getFieldErrors().toString());
    }

    @Test
    public void testInvalidEmailUser() {
        User invalidUser = new User("invalid-email", "validPassword");
        BeanPropertyBindingResult result = new BeanPropertyBindingResult(invalidUser, "user");

        validator.validate(invalidUser, result);

        assertTrue(result.hasErrors());
    }

    @Test
    public void TestNullFieldsUserObject() {
        User invalidUser = new User(null, null);
        BeanPropertyBindingResult result = new BeanPropertyBindingResult(invalidUser, "user");

        validator.validate(invalidUser, result);

        assertTrue(result.hasErrors());
    }

    @Test
    public void testShortPassword() {
        User invalidUser = new User("valid.email@example.com", "123");
        BeanPropertyBindingResult result = new BeanPropertyBindingResult(invalidUser, "user");

        validator.validate(invalidUser, result);

        assertTrue(result.hasErrors());
        assertEquals("Password must be at least 4 characters long.",
                result.getFieldError("password").getDefaultMessage());
    }

    @Test
    public void testIfUserAlreadyExists() {
        User userExists = new User("Deltoro1999@icloud.com", "validPassword"); // Changed from 'user' to 'userExists'
        User validUser = new User("valid.email@example.com", "validPassword");

        // Mocking repository behavior: userExists already exists, validUser does not
        // exist
        when(accountRepository.findById(userExists.getUsername())).thenReturn(Optional.of(userExists)); // Changed from
                                                                                                        // user to
                                                                                                        // userExists
        when(accountRepository.findById(validUser.getUsername())).thenReturn(Optional.empty());
        Optional<User> result = accountRepository.findById(userExists.getUsername());

        System.out.println(result);
        Exception exception = Assertions.assertThrows(UserAlreadyExistsException.class, () -> {
            accountService.addUser(userExists);
        });
        Assertions.assertEquals("Username already exists", exception.getMessage());

        accountService.addUser(validUser);
        verify(accountRepository, times(1)).save(validUser);
    }

}
