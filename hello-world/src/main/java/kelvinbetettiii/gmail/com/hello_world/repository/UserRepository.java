package kelvinbetettiii.gmail.com.hello_world.repository;

import kelvinbetettiii.gmail.com.hello_world.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    List<UserModel> findByNameContainsIgnoreCaseOrderByName(String name);

    List<UserModel> findByEmailEqualsIgnoreCase(String email);

    List<UserModel> findByNascimentoBefore(LocalDate date);

    List<UserModel> findByNascimentoAfter(LocalDate date);

    List<UserModel> findByNascimento(LocalDate date);

    List<UserModel> findByNameAndEmailIgnoreCase(String name, String email);
}