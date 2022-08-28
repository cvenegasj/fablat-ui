package net.fablat.fablatui.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public WebFluxConfigurer corsConfigurer() {
        return new WebFluxConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }

//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests(authorizeRequests ->
//                        authorizeRequests
//                                .anyRequest().authenticated()
//                )
//                .oauth2Login(oauth2Login ->
//                        oauth2Login.loginPage("/oauth2/authorization/fablat-client-oidc"))
//                .oauth2Client(Customizer.withDefaults());
//        return http.build();
//    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
////        return (web) -> web.ignoring().antMatchers("/", "/resources/**",
////                "/static/**", "/css/**", "/js/**", "/img/**",
////                "/home.html", "/calendar.html", "/signup-1.html", "/signup-2.html", "/signup-successful.html");
//
//        return (web) -> web.ignoring().anyRequest();
//    }
}
