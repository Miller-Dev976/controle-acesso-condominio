package condominio;

import java.util.ArrayList;
import java.util.List;

/**
 * Abstração: não existe "um morador genérico". Todo morador é
 * adimplente ou inadimplente, então Morador é abstrata.
 */
public abstract class Morador {

    private final String nome;
    private final String documento;
    private final Unidade unidade;                               // associação "pertence a" (1)
    private final List<Reserva> reservas = new ArrayList<>();   // associação "faz" (*)

    protected Morador(String nome, String documento, Unidade unidade) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome do morador é obrigatório.");
        }
        if (documento == null || documento.isBlank()) {
            throw new IllegalArgumentException("Documento do morador é obrigatório.");
        }
        if (unidade == null) {
            throw new IllegalArgumentException("Morador precisa pertencer a uma unidade.");
        }
        this.nome = nome;
        this.documento = documento;
        this.unidade = unidade;
    }

    /** Polimorfismo: contrato abstrato, cada tipo de morador responde do seu jeito. */
    public abstract boolean podeReservar();

    void adicionarReserva(Reserva reserva) {
        reservas.add(reserva);
    }

    public String getNome() {
        return nome;
    }

    public String getDocumento() {
        return documento;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public List<Reserva> getReservas() {
        return List.copyOf(reservas);
    }
}
