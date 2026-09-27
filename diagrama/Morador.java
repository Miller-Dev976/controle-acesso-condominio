package condominio;

import java.util.ArrayList;
import java.util.List;

public class Morador {

    private final String nome;
    private final String cpf;
    private final Unidade unidade;
    private final List<Reserva> reservas = new ArrayList<>();

    public Morador(String nome, String cpf, Unidade unidade) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome do morador é obrigatório.");
        }
        if (cpf == null || cpf.isBlank()) {
            throw new IllegalArgumentException("CPF do morador é obrigatório.");
        }
        if (unidade == null) {
            throw new IllegalArgumentException("Morador precisa pertencer a uma unidade.");
        }
        this.nome = nome;
        this.cpf = cpf;
        this.unidade = unidade;
        unidade.adicionarMorador(this);
    }

    public boolean podeReservar() {
        return true;
    }

    void adicionarReserva(Reserva reserva) {
        reservas.add(reserva);
    }

    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public List<Reserva> getReservas() {
        return List.copyOf(reservas);
    }
}
