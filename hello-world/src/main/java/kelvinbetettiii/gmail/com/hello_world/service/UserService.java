package kelvinbetettiii.gmail.com.hello_world.service;

import kelvinbetettiii.gmail.com.hello_world.dto.JogoDto;
import kelvinbetettiii.gmail.com.hello_world.dto.UserDto;
import kelvinbetettiii.gmail.com.hello_world.exception.ResourceNotFoundException;
import kelvinbetettiii.gmail.com.hello_world.mapper.CustomModelMapper;
import kelvinbetettiii.gmail.com.hello_world.model.JogoModel;
import kelvinbetettiii.gmail.com.hello_world.model.UserModel;
import kelvinbetettiii.gmail.com.hello_world.repository.JogoRepository;
import kelvinbetettiii.gmail.com.hello_world.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JogoRepository jogoRepository;

    public UserDto create(UserDto userDto) {
        UserModel user = CustomModelMapper.parseObject(userDto, UserModel.class);
        if (userDto.getJogoId() != null) {
            JogoModel jogo = jogoRepository.findById(userDto.getJogoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Jogo não encontrado"));
            user.setJogo(jogo);
        }
        return CustomModelMapper.parseObject(userRepository.save(user), UserDto.class);
    }

    public UserDto findById(long id) {
        UserModel found = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Usuário não encontrado")
        );
        return CustomModelMapper.parseObject(found, UserDto.class);
    }

    public UserDto update(UserDto userDto) {
        UserModel found = userRepository.findById(userDto.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Usuário não encontrado"));

        found.setName(userDto.getName());
        found.setNascimento(userDto.getNascimento());
        found.setEmail(userDto.getEmail());

        if (userDto.getJogoId() != null) {
            JogoModel jogo = jogoRepository.findById(userDto.getJogoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Jogo não encontrado"));
            found.setJogo(jogo);
        }

        return CustomModelMapper.parseObject(userRepository.save(found), UserDto.class);
    }

    public void delete(long id) {
        UserModel found = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Usuário não encontrado"));
        userRepository.delete(found);
    }

    public List<UserDto> findAll() {
        var list = userRepository.findAll();
        return CustomModelMapper.parseObjectList(list, UserDto.class);
    }

    public List<UserDto> findByName(String name) {
        var users = userRepository.findByNameContainsIgnoreCaseOrderByName(name);
        return CustomModelMapper.parseObjectList(users, UserDto.class);
    }

    public List<UserDto> findByEmail(String email) {
        var users = userRepository.findByEmailEqualsIgnoreCase(email);
        return CustomModelMapper.parseObjectList(users, UserDto.class);
    }

    public List<UserDto> findByNascimentoBefore(LocalDate date) {
        var users = userRepository.findByNascimentoBefore(date);
        return CustomModelMapper.parseObjectList(users, UserDto.class);
    }

    public List<UserDto> findByNascimentoAfter(LocalDate date) {
        var users = userRepository.findByNascimentoAfter(date);
        return CustomModelMapper.parseObjectList(users, UserDto.class);
    }

    public List<UserDto> findByNascimento(LocalDate date) {
        var users = userRepository.findByNascimento(date);
        return CustomModelMapper.parseObjectList(users, UserDto.class);
    }

    public List<UserDto> findByNameAndEmail(String name, String email) {
        var users = userRepository.findByNameAndEmailIgnoreCase(name, email);
        return CustomModelMapper.parseObjectList(users, UserDto.class);
    }

    public JogoDto findJogoByUserId(long userId) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        if (user.getJogo() == null) {
            throw new ResourceNotFoundException("Jogo não encontrado para o usuário");
        }

        return CustomModelMapper.parseObject(user.getJogo(), JogoDto.class);
    }
}