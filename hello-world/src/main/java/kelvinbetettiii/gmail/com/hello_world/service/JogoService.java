package kelvinbetettiii.gmail.com.hello_world.service;

import kelvinbetettiii.gmail.com.hello_world.dto.JogoDto;
import kelvinbetettiii.gmail.com.hello_world.exception.ResourceNotFoundException;
import kelvinbetettiii.gmail.com.hello_world.mapper.CustomModelMapper;
import kelvinbetettiii.gmail.com.hello_world.model.JogoModel;
import kelvinbetettiii.gmail.com.hello_world.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JogoService {

    @Autowired
    private JogoRepository repository;

    public JogoDto create(JogoDto jogoDto) {
        JogoModel jogo = CustomModelMapper.parseObject(jogoDto, JogoModel.class);
        return CustomModelMapper.parseObject(repository.save(jogo), JogoDto.class);
    }

    public JogoDto findById(long id) {
        JogoModel found = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Jogo não encontrado")
        );
        return CustomModelMapper.parseObject(found, JogoDto.class);
    }

    public JogoDto update(JogoDto jogoDto) {
        JogoModel found = repository.findById(jogoDto.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Jogo não encontrado"));
        found.setName(jogoDto.getName());
        found.setGender(jogoDto.getGender());
        return CustomModelMapper.parseObject(repository.save(found), JogoDto.class);
    }

    public void delete(long id) {
        JogoModel found = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Jogo não encontrado"));
        repository.delete(found);
    }

    public List<JogoDto> findAll() {
        var list = repository.findAll();
        return CustomModelMapper.parseObjectList(list, JogoDto.class);
    }

    public List<JogoDto> findByName(String name) {
        var jogos = repository.findByNameContainsIgnoreCaseOrderByName(name);
        return CustomModelMapper.parseObjectList(jogos, JogoDto.class);
    }

    public List<JogoDto> findByGender(String gender) {
        var jogos = repository.findByGenderEqualsIgnoreCaseOrderByGenderAscNameAsc(gender);
        return CustomModelMapper.parseObjectList(jogos, JogoDto.class);
    }

    public JogoDto findByUserId(long userId) {
        var jogoModel = repository.findByUsers_Id(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Jogo associado ao usuário não encontrado"));
        return CustomModelMapper.parseObject(jogoModel, JogoDto.class);
    }
}
