package condominio;

/** Morador comum: "é um" Morador e pode reservar normalmente. */
public class MoradorAdimplente extends Morador {

    public MoradorAdimplente(String nome, String documento, Unidade unidade) {
        super(nome, documento, unidade);
    }

    @Override
    public boolean podeReservar() {
        return true;
    }
}
