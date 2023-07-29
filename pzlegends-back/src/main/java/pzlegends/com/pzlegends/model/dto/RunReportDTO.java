package pzlegends.com.pzlegends.model.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pzlegends.com.pzlegends.model.Run;
import pzlegends.com.pzlegends.model.User;


@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class RunReportDTO {

    private Long runId;
    private String message;

}
