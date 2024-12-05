package kelvinbetettiii.gmail.com.hello_world.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "jogos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JogoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private String gender;

    @JsonIgnore
    @OneToMany(mappedBy = "jogo")
    private List<UserModel> users;
}