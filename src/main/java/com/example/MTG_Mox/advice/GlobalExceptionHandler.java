package com.example.MTG_Mox.advice;

import jakarta.mail.MessagingException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    /** Adds error messages to the body of the response entity. Adds a 400 bad request header.
     * The ExceptionHandler annotation tells spring that this method will handle exceptions
     * to the following types.
     * @param exception custom exceptions
     * @return returns response entity of custom error messages
     */
    @ExceptionHandler({UserAlreadyExistsException.class, TokenExpiredException.class, EmailDoesNotExistException.class})
    public ResponseEntity<Object> handleUserAlreadyExistsException( RuntimeException exception){
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(exception.getMessage());
    }
    /**
     * Handles validation errors for method arguments annotated with `@Valid`.
     *
     * <p>This method captures validation errors thrown when a request's input parameters
     * do not meet the specified validation constraints (e.g., `@NotNull`, `@Size`, etc.).
     * It extracts field-specific error messages and returns them as a structured JSON response.
     *
     * @param ex      the exception containing validation errors
     * @param headers the HTTP headers for the response
     * @param status  the HTTP status code to return
     * @param request the original web request
     * @return a {@link ResponseEntity} containing a map of field names and their respective validation error messages,
     *         along with a `400 BAD REQUEST` status
     */
    @Override
    @NonNull
    protected ResponseEntity<Object> handleMethodArgumentNotValid(@NonNull MethodArgumentNotValidException ex, @NonNull HttpHeaders headers, @NonNull HttpStatusCode status, @NonNull WebRequest request) {
            Map<String, String> errors = new HashMap<>();
            for(FieldError fieldError : ex.getFieldErrors()){
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return Objects.requireNonNull(handleExceptionInternal(ex, errors, headers, HttpStatus.BAD_REQUEST, request));

    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDatabaseException(DataIntegrityViolationException exception) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Database error: " + exception.getMessage());
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<Object> handleMessagingException(MessagingException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error sending email: " + exception.getMessage());
    }

    @ExceptionHandler(UnsupportedEncodingException.class)
    public ResponseEntity<Object> handleUnsupportedEncodingException(UnsupportedEncodingException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Unsupported encoding used in email.");
    }


}
