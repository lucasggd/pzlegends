package pzlegends.com.pzlegends.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_password")
@NoArgsConstructor
public class UserPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "password", nullable = false)
    private String password;

    public UserPassword(Long userId, String password){
        this.user = new User(userId);
        this.password = password;
    }

}
