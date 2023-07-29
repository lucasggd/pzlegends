package pzlegends.com.pzlegends;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"pzlegends.com.pzlegends.controller"})
@ComponentScan(basePackages = {"pzlegends.com.pzlegends.service"})
@EnableJpaRepositories(basePackages = {"pzlegends.com.pzlegends.repository"})
public class PzlegendsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PzlegendsApplication.class, args);
	}

}
