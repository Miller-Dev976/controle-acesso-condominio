package condominio;

/**
 * Composição (◆): a Cobranca nasce dentro da Reserva e não existe sem ela.
 * Construtor pacote-privado: só a Reserva cria a sua cobrança.
 */
public class Cobranca {

    private final double valor;
    private boolean paga;

    Cobranca(double valor) {
        if (valor < 0) {
            throw new IllegalArgumentException("A taxa nunca pode ser negativa.");
        }
        this.valor = valor;
        this.paga = false;
    }

    public void quitar() {
        if (paga) {
            throw new IllegalStateException("Cobrança já está paga.");
        }
        paga = true;
    }

    public double getValor() {
        return valor;
    }

    public boolean estaPaga() {
        return paga;
    }
}
