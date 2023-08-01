package pzlegends.com.pzlegends.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CreateAccountDTO {

    private String username;
    private String password;
    private String email;

}
