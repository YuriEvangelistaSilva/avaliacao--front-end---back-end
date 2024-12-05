package kelvinbetettiii.gmail.com.hello_world.repository;

import kelvinbetettiii.gmail.com.hello_world.model.JogoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JogoRepository extends JpaRepository<JogoModel, Long> {

    // Busca por jogos com nomes semelhantes, ignorando maiúsculas/minúsculas
    List<JogoModel> findByNameContainsIgnoreCaseOrderByName(String name);

    // Busca jogos por gênero, ordenados pelo gênero e nome
    List<JogoModel> findByGenderEqualsIgnoreCaseOrderByGenderAscNameAsc(String gender);

    // Busca jogo associado ao ID do usuário (derivação direta do relacionamento)
    Optional<JogoModel> findByUsers_Id(long userId);
}