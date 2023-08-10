package com.nakaligoba.backend.filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.*;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // Set the allowed headers
        httpResponse.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:3000");
        httpResponse.setHeader(ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
        httpResponse.setHeader(ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader(ACCESS_CONTROL_ALLOW_HEADERS, "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

        // Handle preflight OPTIONS requests
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // This can be left empty, but is here if you ever want to initialize anything related to this filter
    }

    @Override
    public void destroy() {
        // This can be left empty, but is here if you ever want to perform any cleanup when the filter is destroyed
    }
}
