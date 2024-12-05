package kelvinbetettiii.gmail.com.hello_world.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate nascimento;

    @Column(length = 100, nullable = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "jogo_id", referencedColumnName = "id", nullable = false)
    private JogoModel jogo;
}