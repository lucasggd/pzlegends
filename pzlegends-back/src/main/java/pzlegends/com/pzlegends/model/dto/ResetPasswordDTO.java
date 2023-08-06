package pzlegends.com.pzlegends.model.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter @Setter
public class ResetPasswordDTO {

    private String email;
    private String code;
    private String password;

}
