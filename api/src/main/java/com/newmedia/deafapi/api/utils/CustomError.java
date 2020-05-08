package com.newmedia.deafapi.api.utils;


public class CustomError extends Exception {
    private ErrorTypeEnum ErrorType;

    public ErrorTypeEnum getErrorType() {
        return ErrorType;
    }

    public void setErrorType(ErrorTypeEnum errorType) {
        ErrorType = errorType;
    }

    public CustomError(String message, ErrorTypeEnum errorType) {
        super(message);
        ErrorType = errorType;
    }

    public static enum ErrorTypeEnum {
        NotFound,
    }
}
