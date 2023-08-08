package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.controller.UserController.SignupRequest;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class UserControllerValidTest {

    private static Validator validator;

    @BeforeAll
    public static void init() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @DisplayName("인스타그램 아이디에는 @을 포함할 수 없다.")
    @Test
    void givenUsernameWithAt_whenRequest_thenInvalid() {
        String email = "test@test.com";
        String password = "test123";
        String usernameWithAt = "test@fds";
        String fullname = "Dae eun";

        SignupRequest request = SignupRequest.builder()
                .email(email)
                .password(password)
                .username(usernameWithAt)
                .fullname(fullname)
                .build();

        var violations = validator.validate(request);

        assertThat(violations.size()).isNotZero();
    }
}
