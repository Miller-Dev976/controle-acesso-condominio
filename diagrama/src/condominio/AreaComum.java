package condominio;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class AreaComum {

    private final String nome;
    private final double taxa;
    private final List<Reserva> reservas = new ArrayList<>();   // associação "registra" (*)

    public AreaComum(String nome, double taxa) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome da área comum é obrigatório.");
        }
        if (taxa < 0) {
            throw new IllegalArgumentException("A taxa nunca pode ser negativa.");
        }
        this.nome = nome;
        this.taxa = taxa;
    }

    /**
     * Regra inegociável: a área só pode ter uma reserva por período.
     * Se violar, recusa na entrada (exceção) em vez de gravar o estado errado.
     */
    public Reserva reservar(Morador morador, LocalDateTime inicio, LocalDateTime fim) {
        if (morador == null) {
            throw new IllegalArgumentException("Informe o morador que está reservando.");
        }
        if (!morador.podeReservar()) {   // polimorfismo: sem if de tipo
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

    public double getTaxa() {
        return taxa;
    }

    public List<Reserva> getReservas() {
        return List.copyOf(reservas);
    }
}
