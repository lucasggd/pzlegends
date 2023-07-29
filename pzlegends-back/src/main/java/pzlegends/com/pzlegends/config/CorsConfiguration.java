package pzlegends.com.pzlegends.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pzlegends.com.pzlegends.interceptor.JwtTokenInterceptor;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
    @Autowired
    private JwtTokenInterceptor authorizationInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT")
                .allowedHeaders("Authorization", "Requestor-Type", "content-type")
                .exposedHeaders("X-Get-Header");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration ir = registry.addInterceptor(authorizationInterceptor);
        ir.addPathPatterns("/**");
        ir.excludePathPatterns("/authenticate");
        ir.excludePathPatterns("/category");
        ir.excludePathPatterns("/category/{id}/runs");
    }
}