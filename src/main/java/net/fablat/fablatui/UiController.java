package net.fablat.fablatui;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
public class UiController {

    @GetMapping("/healthcheck")
    public Map<String, Object> healthcheck() {
        Map<String, Object> model = Map.of(
                "id", UUID.randomUUID().toString(),
                "content", "Hello World!");
        return model;
    }

    @GetMapping("/user")
    public OidcUser getUserInfo(@AuthenticationPrincipal OidcUser principal) {
        return principal;
    }
}
