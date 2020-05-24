package com.findcat.esdemo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CatUIController {

    @GetMapping(value = "/")
    public String index() {
        return "index";
    }

}
