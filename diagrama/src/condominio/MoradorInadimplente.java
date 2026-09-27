package condominio;

/** "É um" Morador, mas fica bloqueado de reservar até quitar a taxa pendente. */
public class MoradorInadimplente extends Morador {

    private double taxaPendente;

    public MoradorInadimplente(String nome, String documento, Unidade unidade, double taxaPendente) {
        super(nome, documento, unidade);
        if (taxaPendente <= 0) {
            throw new IllegalArgumentException("Taxa pendente deve ser maior que zero.");
        }
        this.taxaPendente = taxaPendente;
    }

    @Override
    public boolean podeReservar() {
        return taxaPendente == 0;
    }

    public void quitar(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor de quitação deve ser positivo.");
        }
        if (valor >= taxaPendente) {
            taxaPendente = 0;
        } else {
            taxaPendente = taxaPendente - valor;
        }
    }

    public double getTaxaPendente() {
        return taxaPendente;
    }
}
