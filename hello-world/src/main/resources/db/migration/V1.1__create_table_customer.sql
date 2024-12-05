CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    jogo_id BIGINT,
    CONSTRAINT pk_user PRIMARY KEY (id),
    CONSTRAINT fk_jogo FOREIGN KEY (jogo_id) REFERENCES jogos(id) ON DELETE CASCADE
);