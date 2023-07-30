package pzlegends.com.pzlegends.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "run")
@AllArgsConstructor
@NoArgsConstructor
public class Run {

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

    public Run(Long id) {
        this.id = id;
    }

    public Run(RunRequest runRequest) {
        this.user = runRequest.getUser();
        this.category = runRequest.getCategory();
        this.videoUrl = runRequest.getVideoUrl();
        this.years = runRequest.getYears();
        this.months = runRequest.getMonths();
        this.days = runRequest.getDays();
        this.kills = runRequest.getKills();
    }

}
