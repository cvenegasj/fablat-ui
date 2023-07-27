package net.fablat.fablatui.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.logout.RedirectServerLogoutSuccessHandler;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Configuration
@EnableWebFluxSecurity
public class UiServerConfig {

    @Value("${spring.security.oauth2.client.provider.auth0.issuer-uri}")
    private String issuer;

    @Value("${spring.security.oauth2.client.registration.auth0.client-id}")
    private String clientId;

    @Value("${fablat.landing.uri}")
    private String landingUri;

    @Bean
    public SecurityWebFilterChain configure(ServerHttpSecurity http) {
        return http
                .authorizeExchange(authz -> authz
                    .pathMatchers("/healthcheck").permitAll()
                    .anyExchange().authenticated())
                .oauth2Login(Customizer.withDefaults())
                .logout(logout -> logout.logoutSuccessHandler(logoutSuccessHandler()))
                .build();
    }

    /**
     * Configures the logout handling to log users out of Auth0 after successful logout from the application.
     * @return a {@linkplain ServerLogoutSuccessHandler} that will be called on successful logout.
     */
    @Bean
    public ServerLogoutSuccessHandler logoutSuccessHandler() {
        // Build the URL to log the user out of Auth0 and redirect them to the home page.
        // URL will look like https://YOUR-DOMAIN/v2/logout?clientId=YOUR-CLIENT-ID&returnTo=http://localhost:3000
        String logoutUrl = UriComponentsBuilder
                .fromHttpUrl(issuer + "v2/logout?client_id={clientId}&returnTo={landingUri}")
                .encode()
                .buildAndExpand(clientId, landingUri)
                .toUriString();

        RedirectServerLogoutSuccessHandler handler = new RedirectServerLogoutSuccessHandler();
        handler.setLogoutSuccessUrl(URI.create(logoutUrl));
        return handler;
    }
}
