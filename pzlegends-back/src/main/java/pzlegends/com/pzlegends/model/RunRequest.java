package pzlegends.com.pzlegends.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pzlegends.com.pzlegends.model.enums.RunRequestStatusEnum;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "run_request")
@NoArgsConstructor
public class RunRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "video_url", nullable = false)
    private String videoUrl;

    @Column(name = "years", nullable = false)
    private Long years;

    @Column(name = "months", nullable = false)
    private Long months;

    @Column(name = "days", nullable = false)
    private Long days;

    @Column(name = "kills", nullable = false)
    private Long kills;

    @Column(name = "status", nullable = false)
    private RunRequestStatusEnum runRequestStatus;

    @ManyToOne
    @JoinColumn(name = "response_by")
    private User response_by;

    @Column(name = "response_at")
    private Date response_at;
    public RunRequest(User user, Category category, String videoUrl, Long years, Long months, Long days, Long kills) {
        this.user = user;
        this.category = category;
        this.videoUrl = videoUrl;
        this.years = years;
        this.months = months;
        this.days = days;
        this.kills = kills;
        this.runRequestStatus = RunRequestStatusEnum.PENDING;
    }
}
