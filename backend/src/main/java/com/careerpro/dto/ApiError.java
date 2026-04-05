package com.careerpro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * ApiError — standard error response body for all exceptions.
 * Ensures consistent error format from the API.
 */
@Data
@AllArgsConstructor
public class ApiError {
    private int status;
    private String message;
    private LocalDateTime timestamp;
}
