package pzlegends.com.pzlegends.interceptor;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtTokenInterceptor implements HandlerInterceptor {
    private static final String SECRET_KEY = "y3BcEdH3MbQeShVmYq3t6w9zGCCF3JDNcRfUjWnZr4u7xcAsDhhLKaPdSgVkYp2sy3BcEdH3MbQeShVmYq3t6w9zGCCF3JDNcRfUjWnZr4u7xcAsDhhLKaPdSgVkYp2s";
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (HttpMethod.OPTIONS.toString().equals(request.getMethod()))
            return true;

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            try {
                Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
                request.setAttribute("claims", claims);
                return true;
            } catch (JwtException e) {
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid token");
                return false;
            }
        } else {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Missing token");
            return false;
        }
    }
}
