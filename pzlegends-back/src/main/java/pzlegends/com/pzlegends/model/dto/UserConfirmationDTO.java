package pzlegends.com.pzlegends.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserConfirmationDTO {

    private Long userId;
    private String code;

}
