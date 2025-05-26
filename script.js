document.addEventListener("DOMContentLoaded", function () {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const categorias = {
    Alimentos: [
      {
        id: 1,
        nome: "Arroz",
        descricao: "Arroz branco longo, 5kg",
        imagemUrl: "imagens/arroz.jpg",
        preco: "20.00",
      },
      {
        id: 2,
        nome: "Feijão",
        descricao: "Feijão preto, 1kg",
        imagemUrl: "imagens/feijao.jpg",
        preco: "7.50",
      },
      {
        id: 3,
        nome: "Macarrão",
        descricao: "Macarrão integral, 500g",
        imagemUrl: "imagens/macarrao.jpg",
        preco: "4.99",
      },
    ],
    Bebidas: [
      {
        id: 4,
        nome: "Coca Cola",
        descricao: "Refrigerante de cola, 2l",
        imagemUrl: "imagens/coca.jpg",
        preco: "6.99",
      },
      {
        id: 5,
        nome: "Suco de Laranja",
        descricao: "Suco natural, 1l",
        imagemUrl: "imagens/suco.jpg",
        preco: "5.99",
      },
      {
        id: 6,
        nome: "Agua mineral",
        descricao: "Agua mineral sem gás, 500ml",
        imagemUrl: "imagens/agua.jpg",
        preco: "3.99",
      },
    ],
    Laticínios: [
      {
        id: 7,
        nome: "Leite Integral",
        descricao: "Leite integral, 1l",
        imagemUrl: "imagens/leite.jpg",
        preco: "3.99",
      },
      {
        id: 8,
        nome: "Queijo",
        descricao: "Queijo",
        imagemUrl: "imagens/queijo.jpg",
        preco: "50.90",
      },
      {
        id: 9,
        nome: "Iogurte Natural",
        descricao: "Iogurte natural, 170g",
        imagemUrl: "imagens/iogurte.jpg",
        preco: "2.99",
      },
    ],
    "Produtos de Limpeza": [
      {
        id: 10,
        nome: "Detergente",
        descricao: "Detergente líquido, 500ml",
        imagemUrl: "imagens/detergente.jpg",
        preco: "2.99",
      },
      {
        id: 11,
        nome: "Desinfetante",
        descricao: "Desinfetante multiuso, 500ml",
        imagemUrl: "imagens/desinfetante.jpg",
        preco: "2.99",
      },
      {
        id: 12,
        nome: "Agua Sanitária",
        descricao: "Água sanitária, 1l",
        imagemUrl: "imagens/agua_sanitaria.jpg",
        preco: "3.99",
      },
    ],
    Snacks: [
      {
        id: 13,
        nome: "Batata Chips",
        descricao: "Batata Chips, sabor queijo, 100g",
        imagemUrl: "imagens/batata_chips.jpg",
        preco: "7.99",
      },
      {
        id: 14,
        nome: "Amendoin",
        descricao: "Amendoin torrado e salgado, 200g",
        imagemUrl: "imagens/amendoim.jpg",
        preco: "6.99",
      },
      {
        id: 15,
        nome: "Bolacha Recheada",
        descricao: "Bolacha recheada, sabor chocolate. 150g",
        imagemUrl: "imagens/bolacha.jpg",
        preco: "5.99",
      },
    ],
  };

  const secoesProdutos = document.getElementById("secoes-produtos");

  const campoPesquisa = document.getElementById("campo-pesquisa");

  const botaoPesquisar = document.getElementById("botao-pesquisar");

  const botaoVerCarrinho = document.getElementById("botao-ver-carrinho");

  const contadorCarrinho = document.getElementById("contador-carrinho");

  const listaItensCarrinho = document.getElementById("lista-itens-carrinho");

  const botaoCategoria = document.querySelectorAll(".categoria");

  const botaoLimparFiltro = document.getElementById("limpar-filtro");

  const modalProduto = new bootstrap.Modal(
    document.getElementById("modalProduto")
  );

  const imagemProduto = document.getElementById("imagem-produto");

  const nomeProduto = document.getElementById("nome-produto");
  const descricaoProduto = document.getElementById("descricao-produto");

  const precoProduto = document.getElementById("preco-produto");

  const quantidadeProduto = document.getElementById("quantidade-produto");

  const botaoAdicionarCarrinhoModal = document.getElementById(
    "botao-adicionar-carrinho-modal"
  );

  function atualizarExibicaoProdutos(categoriasFiltradas) {
    secoesProdutos.innerHTML = "";

    Object.keys(categoriasFiltradas).forEach((categoria) => {
      if (categoriasFiltradas[categoria].length > 0) {
        let secao = document.createElement("section");
        let h2 = document.createElement("h2");
        h2.textContent = categoria;
        secao.appendChild(h2);

        let linha = document.createElement("div");
        linha.className = "row";

        categoriasFiltradas[categoria].forEach((produto) => {
          let coluna = document.createElement("div");
          coluna.className = "col-md-4";

          let cartao = document.createElement("div");
          cartao.className = "card";

          cartao.innerHTML = `
            <img src="${produto.imagemUrl}" class="bg-imagem-topo" alt="${produto.nome}" data-bs-toggle="modal" data-bs-target="#modalProduto" data-produto-id="${produto.id}">
            <div class="card-body">
              <h5 class="card-title">${produto.nome}</h5>
              <p class="card-text">${produto.descricao}</p>
              <p class="card-text"><strong>Preço: R$ ${produto.preco}</strong></p>
              <button class="btn btn-primary adicionar-ao-carrinho" data-produto-id="${produto.id}>Adicionar ao Carrinho</button>
            </div>
            `;

          coluna.appendChild(cartao);

          linha.appendChild(coluna);
        });

        secao.appendChild(linha);

        secoesProdutos.appendChild(secao);
      }
    });

    document.querySelectorAll(".adicionar-ao-carrinho").forEach((botao) => {
      botao.addEventListener("click", function () {
        const idProduto = parseInt(this.getAttribute("data-produto-id"));

        adicionarAoCarrinho(idProduto);
      });
    });

    document.querySelectorAll(".bg-imagem-topo").forEach((imagem) => {
      imagem.addEventListener("click", function () {
        const idProduto = parseInt(this.getAttribute("data-produto-id"));
        const produto = obterProdutoPorId(idProduto);

        if (produto) {
          imagemProduto.src = produto.imagemUrl;
          nomeProduto.textContent = produto.nome;
          descricaoProduto.textContent = produto.descricao;
          precoProduto.textContent = produto.preco;
          botaoAdicionarCarrinhoModal.setAttribute(
            "data-produto-id",
            produto.id
          );
          quantidadeProduto.value = 1;
          modalProduto.show();

        }
      });
    });
  }

  function adicionarAoCarrinho(idProduto, quantidade = 1) {
    const produto = obterProdutoPorId(idProduto);

    if (!produto) return;

    const produtoExistente = carrinho.find((item) => item.id === produto.id);

    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
    } else {
      carrinho.push({ ...produto, quantidade: quantidade });
    }

    atualizarContadorCarrinho();
  }

  function obterProdutoPorId(id) {
    for (let categoria in categorias) {
      const produto = categorias[categoria].find((item) => item.id === id);

      if (produto) {
        return produto;
      }
    }

    return null;
  }

  function exibirCarrinho() {
    listaItensCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
      let mensagemVazia = document.createElement("li");
      mensagemVazia.textContent = "Carrinho vazio";

      mensagemVazia.className = "list-group-item";
      listaItensCarrinho.appendChild(mensagemVazia);
    } else {
      carrinho.forEach((item) => {
        let itemLista = document.createElement("li");
        itemLista.className =
          "list-group-item d-flex justify-content-between align-items-center";

        itemLista.innerHTML = `
            <div class="item-carrinho">
            <img src="${item.imagemUrl}" alt="${item.nome}" class="imagem-item-carrinho">
            <div class="detalhes-item-carrinho">
              <span>${item.nome}</span>
              <span>R$ ${item.preco}</span>
              <span>Quantidade: ${item.quantidade}</span>

            </div>
            </div>

            <button class="btn btn-danger btn-sm remover-do-carrinho" data-produto-id="${item.id}">Remover</button>


          `;

        listaItensCarrinho.appendChild(itemLista);
      });

      let itemTotal = document.createElement("li");
      itemTotal.className = "list-group-item list-group-item-dark";

      let total = carrinho.reduce(
        (acc, item) =>
          acc + parseFloat(item.preco.replace(",", ".")) * item.quantidade,
        0
      );

      itemTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
      listaItensCarrinho.appendChild(itemTotal);
    }
    document.querySelectorAll(".remover-do-carrinho").forEach((botao) => {
      botao.addEventListener("click", function () {
        const idProduto = parseInt(this.getAttribute("data-produto-id"));

        removerDoCarrinho(idProduto);
      });
    });

    let modalCarrinho = new bootstrap.Modal(
      document.getElementById("modalCarrinho"),
      {}
    );

    modalCarrinho.show();

    modalCarrinho._element.addEventListener('hidden.bs.modal', function () {
      window.location.href = "index.html";
    });
  }

  function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter((item) => item.id !== idProduto);
    atualizarContadorCarrinho();
    exibirCarrinho();
  }

  function atualizarContadorCarrinho() {
    contadorCarrinho.textContent = `${carrinho.length} itens`;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  botaoAdicionarCarrinhoModal.addEventListener("click", function () {
    const idProduto = parseInt(this.getAttribute("data-produto-id"));
    const quantidade = parseInt(quantidadeProduto.value);

    adicionarAoCarrinho(idProduto, quantidade);
    modalProduto.hide();
  });

  botaoPesquisar.addEventListener("click", function () {
    const termoPesquisa = campoPesquisa.value.toLowerCase();
    const categoriasFiltradas = {};

    Object.keys(categorias).forEach((categoria) => {
      categoriasFiltradas[categoria] = categorias[categoria].filter(
        (produto) => {
          return (
            produto.nome.toLowerCase().includes(termoPesquisa) ||
            produto.descricao.toLowerCase().includes(termoPesquisa)
          );
        }
      );
    });

    atualizarExibicaoProdutos(categoriasFiltradas);
  });

  botaoCategoria.forEach((botao) => {
    botao.addEventListener("click", function () {
      const categoria = this.getAttribute("data-categoria");
      const categoriasFiltradas = {};
      categoriasFiltradas[categoria] = categorias[categoria];

      atualizarExibicaoProdutos(categoriasFiltradas);
    });
  });

  botaoLimparFiltro.addEventListener("click", function () {

    atualizarExibicaoProdutos(categorias);

  })

  atualizarExibicaoProdutos(categorias);

  botaoVerCarrinho.addEventListener("click", exibirCarrinho);

  atualizarContadorCarrinho();
});
