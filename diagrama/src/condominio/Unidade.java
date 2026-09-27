package condominio;

public class Unidade {

    private final String numero;

    public Unidade(String numero) {
        if (numero == null || numero.isBlank()) {
            throw new IllegalArgumentException("Número da unidade é obrigatório.");
        }
        this.numero = numero;
    }

    public String getNumero() {
        return numero;
    }
}
