package kelvinbetettiii.gmail.com.hello_world.controller;

import kelvinbetettiii.gmail.com.hello_world.dto.JogoDto;
import kelvinbetettiii.gmail.com.hello_world.service.JogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.LinkRelation;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/jogos")
@Validated
public class JogoController {

    @Autowired
    private JogoService service;

    // Criar novo jogo
    @PostMapping
    public ResponseEntity<JogoDto> create(@Valid @RequestBody JogoDto jogoDto) {
        JogoDto jogo = service.create(jogoDto);
        buildSelfLink(jogo);
        return new ResponseEntity<>(jogo, HttpStatus.CREATED);
    }

    // Buscar jogo por ID
    @GetMapping("/{id}")
    public ResponseEntity<JogoDto> findById(@PathVariable(name = "id") long id) {
        JogoDto jogo = service.findById(id);
        buildSelfLink(jogo);
        return new ResponseEntity<>(jogo, HttpStatus.OK);
    }

    // Atualizar um jogo existente
    @PutMapping
    public ResponseEntity<JogoDto> update(@Valid @RequestBody JogoDto jogoDto) {
        JogoDto jogo = service.update(jogoDto);
        buildSelfLink(jogo);
        return new ResponseEntity<>(jogo, HttpStatus.OK);
    }

    // Deletar jogo por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable(name = "id") long id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Buscar todos os jogos
    @GetMapping
    public ResponseEntity<CollectionModel<JogoDto>> findAll() {
        List<JogoDto> jogosList = service.findAll();
        CollectionModel<JogoDto> jogos = CollectionModel.of(jogosList);
        jogos.forEach(this::buildSelfLink);
        buildCollectionLink(jogos);
        return new ResponseEntity<>(jogos, HttpStatus.OK);
    }

    // Construir link individual para cada JogoDto
    private void buildSelfLink(JogoDto jogoDto) {
        jogoDto.add(
                WebMvcLinkBuilder.linkTo(
                        WebMvcLinkBuilder.methodOn(this.getClass()).findById(jogoDto.getId())
                ).withSelfRel()
        );
    }

    // Construir link para a coleção
    private void buildCollectionLink(CollectionModel<JogoDto> jogos) {
        jogos.add(
                WebMvcLinkBuilder.linkTo(
                        WebMvcLinkBuilder.methodOn(this.getClass()).findAll()
                ).withRel(LinkRelation.of("COLLECTION"))
        );
    }
}