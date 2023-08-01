package pzlegends.com.pzlegends.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_confirmation")
@NoArgsConstructor
public class UserConfirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "code")
    private String code;

    @Column(name = "tries")
    private Long tries;

    public UserConfirmation(User user, String code) {
        this.user = user;
        this.code = code;
        this.tries = 0L;
    }
}
