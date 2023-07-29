package pzlegends.com.pzlegends.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import pzlegends.com.pzlegends.model.enums.UserStatusEnum;
import pzlegends.com.pzlegends.model.enums.UserTypeEnum;

import java.io.Serializable;
import java.sql.Blob;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "user_type", nullable = false)
    private UserTypeEnum userType;

    @Column(name = "status", nullable = false)
    private UserStatusEnum status;

    @Column(name = "avatar")
    private Blob avatar;

    @Column(name = "twitch")
    private String twitch;

    @Column(name = "youtube")
    private String youtube;

    public User() {
    }

    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.userType = UserTypeEnum.USER;
        this.status = UserStatusEnum.NOT_CONFIRMED;
    }

    public User(Long id) {
        this.id = id;
    }
}
