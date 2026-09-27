package condominio;

import java.util.ArrayList;
import java.util.List;

public class Unidade {

    private final String numero;
    private final List<Morador> moradores = new ArrayList<>();

    public Unidade(String numero) {
        if (numero == null || numero.isBlank()) {
            throw new IllegalArgumentException("Número da unidade é obrigatório.");
        }
        this.numero = numero;
    }

    void adicionarMorador(Morador morador) {
        moradores.add(morador);
    }

    public String getNumero() {
        return numero;
    }

    public List<Morador> getMoradores() {
        return List.copyOf(moradores);
    }
}
