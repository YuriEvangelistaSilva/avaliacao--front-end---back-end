package kelvinbetettiii.gmail.com.hello_world.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto extends RepresentationModel<UserDto> {

    private long id;
    private String name;
    private String email;
    private LocalDate nascimento;

    private JogoDto jogo;

    private Long jogoId;

    public String getFullName() {
        return name + "/" + email;
    }

    public String getFullGameName() {
        return jogo != null ? jogo.getFullName() : "Nenhum jogo associado";
    }
}