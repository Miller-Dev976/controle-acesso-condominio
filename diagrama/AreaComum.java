package condominio;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class AreaComum {

    private final String nome;
    private final int capacidade;
    private final List<Reserva> reservas = new ArrayList<>();

    public AreaComum(String nome, int capacidade) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome da área comum é obrigatório.");
        }
        if (capacidade <= 0) {
            throw new IllegalArgumentException("Capacidade deve ser maior que zero.");
        }
        this.nome = nome;
        this.capacidade = capacidade;
    }

    
    public Reserva reservar(Morador morador, LocalDateTime inicio, LocalDateTime fim) {
        if (morador == null) {
            throw new IllegalArgumentException("Informe o morador que está reservando.");
        }
        if (!morador.podeReservar()) {
            throw new IllegalStateException(morador.getNome() + " está impedido de reservar áreas comuns.");
        }
        if (!estaDisponivel(inicio, fim)) {
            throw new IllegalStateException("Área comum já reservada nesse período.");
        }
        Reserva reserva = new Reserva(morador, this, inicio, fim);
        reservas.add(reserva);
        morador.adicionarReserva(reserva);
        return reserva;
    }

    private boolean estaDisponivel(LocalDateTime inicio, LocalDateTime fim) {
        for (Reserva reserva : reservas) {
            if (reserva.conflitaCom(inicio, fim)) {
                return false;
            }
        }
        return true;
    }

    public String getNome() {
        return nome;
    }

    public int getCapacidade() {
        return capacidade;
    }

    public List<Reserva> getReservas() {
        return List.copyOf(reservas);
    }
}
