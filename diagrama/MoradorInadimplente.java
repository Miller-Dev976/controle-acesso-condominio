package condominio;


public class MoradorInadimplente extends Morador {

    private double taxaPendente;

    public MoradorInadimplente(String nome, String cpf, Unidade unidade, double taxaPendente) {
        super(nome, cpf, unidade);
        if (taxaPendente <= 0) {
            throw new IllegalArgumentException("Taxa pendente deve ser maior que zero.");
        }
        this.taxaPendente = taxaPendente;
    }

    public boolean podeReservar() {
        return taxaPendente <= 0;
    }

    public void quitar(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor de quitação deve ser positivo.");
        }
        taxaPendente = Math.max(0, taxaPendente - valor);
    }

    public double getTaxaPendente() {
        return taxaPendente;
    }
}
