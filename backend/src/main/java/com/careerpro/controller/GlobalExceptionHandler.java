package com.careerpro.controller;

import com.careerpro.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

/**
 * GlobalExceptionHandler — catches all exceptions thrown in controllers
 * and returns a clean, consistent JSON error response.
 *
 * VIVA TIP:
 *   @RestControllerAdvice applies this error handling globally.
 *   Without this, Spring would return ugly HTML error pages.
 *   With this, ALL errors return structured JSON like:
 *   { "status": 400, "message": "...", "timestamp": "..." }
 *
 * Two types handled:
 *   1. MethodArgumentNotValidException → 400 Bad Request (validation failures)
 *   2. RuntimeException               → 400 Bad Request (business logic errors)
 *   3. Exception                      → 500 Internal Server Error (unexpected)
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handles @Valid validation failures (e.g., missing required fields)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationErrors(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiError(400, message, LocalDateTime.now()));
    }

    // Handles business logic errors (e.g., sport not found in DB)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiError(400, ex.getMessage(), LocalDateTime.now()));
    }

    // Handles all other unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiError(500,
                    "An unexpected error occurred. Please try again.",
                    LocalDateTime.now()));
    }
}
