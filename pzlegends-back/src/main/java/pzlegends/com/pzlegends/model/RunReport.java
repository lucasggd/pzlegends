package pzlegends.com.pzlegends.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pzlegends.com.pzlegends.model.enums.RunReportStatusEnum;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "run_report")
@NoArgsConstructor
@AllArgsConstructor
public class RunReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "run_id", nullable = false)
    private Run run;

    @ManyToOne
    @JoinColumn(name = "report_by", nullable = false)
    private User reportBy;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "status", nullable = false)
    private RunReportStatusEnum runReportStatus;

    @ManyToOne
    @JoinColumn(name = "response_by")
    private User response_by;

    @Column(name = "response_at")
    private Date response_at;
    public RunReport(Long runId, Long reportById, String message) {
        this.run = new Run(runId);
        this.reportBy = new User(reportById);
        this.message = message;
        this.runReportStatus = RunReportStatusEnum.PENDING;
    }
}
