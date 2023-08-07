package com.nakaligoba.backend.filter;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpHeaders.*;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:3000");
        httpResponse.setHeader(ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
        httpResponse.setHeader(ACCESS_CONTROL_ALLOW_METHODS, "*");

        chain.doFilter(request, response);
    }
}
