package com.findcat.esdemo;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CatRestController {

    @PostMapping(value = "/search", consumes = "application/json", produces = "application/json")
    public String searchQuery(@RequestBody(required = false) String query) throws UnirestException {
        if (query == null || query.isEmpty()) {
            return "{\"error\": \"Query is empty!\"}";
        }
        Unirest.setTimeouts(0, 0);
        String bonsaiUrl = System.getenv().get("BONSAI_URL");
        HttpResponse<String> response =
                Unirest.post(bonsaiUrl + "/cat/_search/").header("Content-Type", "application/json").body(query).asString();
        return response.getBody();
    }

}
