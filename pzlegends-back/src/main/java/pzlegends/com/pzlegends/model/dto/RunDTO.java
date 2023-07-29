package pzlegends.com.pzlegends.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class RunDTO {
    private String username;
    private Long categoryId;
    private String videoUrl;
    private Long years;
    private Long months;
    private Long days;
    private Long kills;
    private String message;



}
