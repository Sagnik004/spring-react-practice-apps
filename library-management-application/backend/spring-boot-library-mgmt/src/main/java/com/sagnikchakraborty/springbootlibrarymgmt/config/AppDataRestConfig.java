package com.sagnikchakraborty.springbootlibrarymgmt.config;

import com.sagnikchakraborty.springbootlibrarymgmt.entity.Book;
import com.sagnikchakraborty.springbootlibrarymgmt.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class AppDataRestConfig implements RepositoryRestConfigurer {

    private String allowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {
        /* Configure unsupported Http Methods */
        HttpMethod[] unsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PUT,
                HttpMethod.PATCH,
                HttpMethod.DELETE
        };

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);

        disableHttpMethods(Book.class, config, unsupportedActions);
        disableHttpMethods(Review.class, config, unsupportedActions);

        /* Configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(allowedOrigins);
    }

    private void disableHttpMethods(Class<?> entityClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(entityClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }

}
