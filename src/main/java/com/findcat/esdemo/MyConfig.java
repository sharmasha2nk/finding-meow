package com.findcat.esdemo;

import javax.servlet.Filter;

import com.moesif.servlet.MoesifFilter;

import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyConfig implements WebMvcConfigurer {

    @Bean
    @ConditionalOnExpression("#{systemEnvironment['MOESIF_APPLICATION_ID'] != null}")
    public Filter moesifFilter() {
        String moesifApplicationId = System.getenv().get("MOESIF_APPLICATION_ID");
        return new MoesifFilter(moesifApplicationId);
    }
}
