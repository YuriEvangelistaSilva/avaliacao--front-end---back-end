package kelvinbetettiii.gmail.com.hello_world.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JogoDto extends RepresentationModel<JogoDto> {

    private Long id; // Permitir nulo para criação de novos jogos.

    @NotBlank(message = "O nome do jogo não pode estar vazio.")
    @Size(min = 2, max = 50, message = "O nome do jogo deve ter entre 2 e 50 caracteres.")
    private String name;

    @NotBlank(message = "O gênero do jogo não pode estar vazio.")
    @Size(min = 3, max = 30, message = "O gênero do jogo deve ter entre 3 e 30 caracteres.")
    private String gender;

//    private List<UserDto> users = new ArrayList<>(); // Inicializar para evitar nulos.

    public String getFullName() {
        return name + "/" + gender;
    }
}