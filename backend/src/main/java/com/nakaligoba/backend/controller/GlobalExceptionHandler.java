package com.nakaligoba.backend.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final MessageSource messageSource;

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResult> handleBadRequest(IllegalArgumentException ex) {
        ErrorResult errorResult = new ErrorResult(ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResult);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorResult>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<ErrorResult> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> messageSource.getMessage(e, Locale.KOREAN))
                .map(ErrorResult::new)
                .collect(Collectors.toList());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errors);
    }

    @Data
    private static class ErrorResult {
        private String message;
        private String code;

        public ErrorResult(String message) {
            this.message = message;
        }
    }
}
