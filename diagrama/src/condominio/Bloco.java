package condominio;

import java.util.ArrayList;
import java.util.List;

/**
 * Agregação (◇): o Bloco apenas agrupa unidades que já existem.
 * Se o Bloco sumir, as unidades continuam existindo.
 */
public class Bloco {

    private final String nome;
    private final List<Unidade> unidades = new ArrayList<>();

    public Bloco(String nome) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome do bloco é obrigatório.");
        }
        this.nome = nome;
    }

    public void adicionar(Unidade unidade) {
        if (unidade == null) {
            throw new IllegalArgumentException("Informe a unidade.");
        }
        unidades.add(unidade);   // recebe uma unidade pronta, não cria
    }

    public String getNome() {
        return nome;
    }

    public List<Unidade> getUnidades() {
        return List.copyOf(unidades);
    }
}
