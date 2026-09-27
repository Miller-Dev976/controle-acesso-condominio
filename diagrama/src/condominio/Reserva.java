package condominio;

import java.time.LocalDateTime;

public class Reserva {

    private final Morador morador;
    private final AreaComum areaComum;
    private final LocalDateTime inicio;
    private final LocalDateTime fim;
    private StatusReserva status;
    private final Cobranca cobranca;   // composição: nasce junto com a reserva

    /** Pacote-privado: uma Reserva só nasce por AreaComum.reservar(...). */
    Reserva(Morador morador, AreaComum areaComum, LocalDateTime inicio, LocalDateTime fim) {
        if (morador == null) {
            throw new IllegalArgumentException("Reserva precisa de um morador.");
        }
        if (areaComum == null) {
            throw new IllegalArgumentException("Reserva precisa de uma área comum.");
        }
        if (inicio == null || fim == null || !fim.isAfter(inicio)) {
            throw new IllegalArgumentException("Período da reserva é inválido.");
        }
        this.morador = morador;
        this.areaComum = areaComum;
        this.inicio = inicio;
        this.fim = fim;
        this.status = StatusReserva.SOLICITADA;
        this.cobranca = new Cobranca(areaComum.getTaxa());
    }

    public void confirmar() {
        if (status != StatusReserva.SOLICITADA) {
            throw new IllegalStateException("Só é possível confirmar uma reserva solicitada.");
        }
        status = StatusReserva.CONFIRMADA;
    }

    public void cancelar() {
        if (status == StatusReserva.CANCELADA) {
            throw new IllegalStateException("Reserva já está cancelada.");
        }
        status = StatusReserva.CANCELADA;
    }

    public boolean conflitaCom(LocalDateTime outroInicio, LocalDateTime outroFim) {
        if (status == StatusReserva.CANCELADA) {
            return false;
        }
        return inicio.isBefore(outroFim) && outroInicio.isBefore(fim);
    }

    public Morador getMorador() {
        return morador;
    }

    public AreaComum getAreaComum() {
        return areaComum;
    }

    public LocalDateTime getInicio() {
        return inicio;
    }

    public LocalDateTime getFim() {
        return fim;
    }

    public StatusReserva getStatus() {
        return status;
    }

    public Cobranca getCobranca() {
        return cobranca;
    }
}
