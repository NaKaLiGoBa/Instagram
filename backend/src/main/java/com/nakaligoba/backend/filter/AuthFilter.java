package com.nakaligoba.backend.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.PatternMatchUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Objects;

@Slf4j
public class AuthFilter implements Filter {

    private static final String[] WHITE_LIST = {"/api/v1/auth/signin", "/api/v1/users/signup"};

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response, FilterChain chain
    ) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        if (isWhiteUrl(httpRequest)) {
            chain.doFilter(request, response);
            return;
        }

        log.info("Start User Authentication by Session");

        if (isNotValid(httpRequest)) {
            log.info("Unauthorized User Request");
            responseError(response);
            return;
        }

        log.info("Authorized User Request");
        chain.doFilter(request, response);
    }

    private boolean isWhiteUrl(HttpServletRequest httpRequest) {
        String requestURI = httpRequest.getRequestURI();
        return PatternMatchUtils.simpleMatch(WHITE_LIST, requestURI);
    }

    private boolean isNotValid(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Cookie[] cookies = request.getCookies();
        String sessionValue = getSessionValue(cookies);

        if (Objects.isNull(session) || Objects.isNull(session.getAttribute("session_id"))) {
            return true;
        }

        if (Objects.isNull(sessionValue)) {
            return true;
        }

        return !sessionValue.equals(session.getAttribute("session_id").toString());
    }

    private String getSessionValue(Cookie[] cookies) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("session_id")) {
                return cookie.getValue();
            }
        }

        return null;
    }

    private void responseError(ServletResponse response) {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
        httpResponse.setCharacterEncoding("UTF-8");
        try {
            ErrorResult error = new ErrorResult("인가되지 않은 사용자입니다.");
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(error);
            response.getWriter().write(json);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    @Data
    static class ErrorResult {
        private String message;
        private String code;

        public ErrorResult(String message) {
            this.message = message;
        }
    }
}
