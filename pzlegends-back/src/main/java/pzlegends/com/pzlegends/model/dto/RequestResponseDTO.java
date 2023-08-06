package pzlegends.com.pzlegends.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter @Setter
public class RequestResponseDTO {

    private boolean approved;
    private String message;

}
