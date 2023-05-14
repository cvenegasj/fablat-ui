package net.fablat.fablatui;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.UUID;

@RestController
@Slf4j
public class UiController {

    @GetMapping("/healthcheck")
    public Map<String, Object> healthcheck() {
        Map<String, Object> model = Map.of(
                "id", UUID.randomUUID().toString(),
                "content", "Hello World");
        return model;
    }

    @PostMapping("/auth/google")
    public Mono<Map> loginCallback(@RequestBody Map body) {
        log.info(body.toString());

        Map<String, String> bodyMap = Map.of(
                "code", (String) body.get("code"),
                "client_id", (String) body.get("clientId"),
                "client_secret", "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",
                "redirect_uri", (String) body.get("redirectUri"),
                "grant_type", "authorization_code"
        );

        WebClient webClient = WebClient.builder().baseUrl("https://oauth2.googleapis.com").build();
        return webClient
                .post()
                .uri("/token")
                .body(BodyInserters.fromValue(bodyMap))
                .exchangeToMono(response -> response.bodyToMono(Map.class))
                .doOnNext(obj -> log.info(obj.toString()));
                //.log();
    }


//    @Autowired
//    private WebClient webClient;

    /*@GetMapping(value = "/lol")
    public String getGreeting(
            @RegisteredOAuth2AuthorizedClient("fablat-client-authorization-code")
            OAuth2AuthorizedClient authorizedClient
    ) {
        return this.webClient
                .get()
                .uri("http://127.0.0.1:8081/hello")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }*/

    /*@GetMapping("/me")
    public OAuth2AuthenticatedPrincipal me(@AuthenticationPrincipal OAuth2AuthenticatedPrincipal principal) {
        return principal;
    }*/

    /*@GetMapping("/me")
    public Mono<Principal> me() {
        return this.webClient
                .get()
                .uri("http://127.0.0.1:9000/user")
                //.attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                .bodyToMono(Principal.class);
                //.block();
    }*/

    /*@GetMapping("/me")
    public Map me(
            @RegisteredOAuth2AuthorizedClient("fablat-client-authorization-code")
            OAuth2AuthorizedClient authorizedClient,
            @AuthenticationPrincipal
            OAuth2AuthenticatedPrincipal principal
    ) {
        return this.webClient
                .get()
                .uri("http://127.0.0.1:8081/auth/fabbers/me/profile/" + principal.getName())
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }*/
}
