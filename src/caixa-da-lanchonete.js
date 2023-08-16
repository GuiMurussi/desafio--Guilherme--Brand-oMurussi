class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    const cardapio = [
      { codigo: "cafe", descricao: "Café", valor: 3.0 },
      { codigo: "chantily", descricao: "Chantily", valor: 1.5 },
      { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
      { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
      { codigo: "queijo", descricao: "Queijo", valor: 2.0 },
      { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
      { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    ];

    const formasDePagamentoValidas = ["debito", "credito", "dinheiro"];

    if (!formasDePagamentoValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const itensNoCarrinho = {};

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (!cardapio.some((itemCardapio) => itemCardapio.codigo === codigo)) {
        return "Item inválido!";
      }

      if (!itensNoCarrinho[codigo]) {
        itensNoCarrinho[codigo] = 0;
      }

      itensNoCarrinho[codigo] += parseInt(quantidade);
    }

    let valorTotal = 0;

    for (const [codigo, quantidade] of Object.entries(itensNoCarrinho)) {
      const itemDoCardapio = cardapio.find(
        (itemCardapio) => itemCardapio.codigo === codigo
      );

      valorTotal += itemDoCardapio.valor * quantidade;

      if (
        itemDoCardapio.descricao.includes("extra") &&
        !itensNoCarrinho[codigo.replace("extra", "")]
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95; // 5% de desconto
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03; // 3% de acréscimo
    }

    if (valorTotal === 0) {
      return "Quantidade inválida!";
    }

    return `R$ ${valorTotal.toFixed(2)}`;
  }
}

export { CaixaDaLanchonete };
