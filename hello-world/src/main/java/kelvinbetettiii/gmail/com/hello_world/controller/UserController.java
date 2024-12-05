package kelvinbetettiii.gmail.com.hello_world.controller;

import kelvinbetettiii.gmail.com.hello_world.dto.JogoDto;
import kelvinbetettiii.gmail.com.hello_world.dto.UserDto;
import kelvinbetettiii.gmail.com.hello_world.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.LinkRelation;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping
    public ResponseEntity<UserDto> create(@RequestBody UserDto userDto) {
        validateNascimento(userDto.getNascimento());
        UserDto user = service.create(userDto);
        buildSelfLink(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable(name = "id") long id) {
        UserDto user = service.findById(id);
        buildSelfLink(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UserDto> update(@RequestBody UserDto userDto) {
        validateNascimento(userDto.getNascimento());
        UserDto user = service.update(userDto);
        buildSelfLink(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable(name = "id") long id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<CollectionModel<UserDto>> findAll() {
        CollectionModel<UserDto> users = CollectionModel.of(service.findAll());
        for (UserDto user : users) {
            buildSelfLink(user);
        }
        buildCollectionLink(users);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/name/{name}")
    public ResponseEntity<List<UserDto>> findByName(@PathVariable(name = "name") String name) {
        var users = service.findByName(name);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/email/{email}")
    public ResponseEntity<List<UserDto>> findByEmail(@PathVariable(name = "email") String email) {
        var users = service.findByEmail(email);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/nascimento/before/{date}")
    public ResponseEntity<List<UserDto>> findByNascimentoBefore(@PathVariable(name = "date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        var users = service.findByNascimentoBefore(date);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/nascimento/after/{date}")
    public ResponseEntity<List<UserDto>> findByNascimentoAfter(@PathVariable(name = "date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        var users = service.findByNascimentoAfter(date);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/nascimento/{date}")
    public ResponseEntity<List<UserDto>> findByNascimento(@PathVariable(name = "date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        var users = service.findByNascimento(date);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/name-and-email/{name}/{email}")
    public ResponseEntity<List<UserDto>> findByNameAndEmail(@PathVariable(name = "name") String name,
                                                            @PathVariable(name = "email") String email) {
        var users = service.findByNameAndEmail(name, email);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}/jogo")
    public ResponseEntity<JogoDto> findJogoByUserId(@PathVariable(name = "id") long id) {
        JogoDto jogo = service.findJogoByUserId(id); // Adicione um método correspondente em UserService
        return new ResponseEntity<>(jogo, HttpStatus.OK);
    }

    private void buildSelfLink(UserDto userDto) {
        userDto.add(
                WebMvcLinkBuilder.linkTo(
                        WebMvcLinkBuilder.methodOn(this.getClass()).findById(userDto.getId())
                ).withSelfRel()
        );
    }

    private void buildCollectionLink(CollectionModel<UserDto> users) {
        users.add(
                WebMvcLinkBuilder.linkTo(
                        WebMvcLinkBuilder.methodOn(this.getClass()).findAll()
                ).withRel(LinkRelation.of("COLLECTION"))
        );
    }

    private void validateNascimento(LocalDate nascimento) {
        if (nascimento.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("A data de nascimento não pode ser futura.");
        }
    }
}
