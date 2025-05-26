document.addEventListener("DOMContentLoaded", function() {
    // Este evento 'DOMContentLoaded' é acionado
            // quando todo o conteúdo HTML foi completamente carregado,
    // sem esperar pelo CSS, imagens ou iframes para
            // finalizar. É o ponto onde é seguro manipular o DOM.

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    // Tenta recuperar o array 'carrinho' do
            // armazenamento local (localStorage).
    // 'JSON.parse' converte a string JSON armazenada de
            // volta para um objeto JavaScript.
    // Se 'localStorage.getItem('carrinho')' retorna
            // null (carrinho não existe), o operador '||' garante
            // que 'carrinho' será um array vazio.

    const categorias = {

        // Declara um objeto 'categorias' que contém arrays
                // de objetos para cada categoria de produtos.
        "Alimentos": [

            // Array de objetos representando produtos na
                    // categoria "Alimentos".
            { id: 1, nome: "Arroz", descricao: "Arroz branco longo, 5kg", imagemUrl: "imagens/arroz.jpg", preco: "19,90" },
            // Cada objeto tem um 'id' único, 'nome', 'descricao', 'imagemUrl'
                    // para a foto do produto, e 'preco'.
            { id: 2, nome: "Feijão", descricao: "Feijão preto, 1kg", imagemUrl: "imagens/feijao.jpg", preco: "7,50" },
            { id: 3, nome: "Macarrão", descricao: "Macarrão integral, 500g", imagemUrl: "imagens/macarrao.jpg", preco: "4,99" }

        ],
        "Bebidas": [
            { id: 4, nome: "Coca Cola", descricao: "Refrigerante de cola, 2l", imagemUrl: "imagens/coca.jpg", preco: "6,99" },
            { id: 5, nome: "Suco de Laranja", descricao: "Suco natural, 1l", imagemUrl: "imagens/suco.jpg", preco: "5,99" },
            { id: 6, nome: "Água Mineral", descricao: "Água mineral sem gás, 500ml", imagemUrl: "imagens/agua.jpg", preco: "1,99" }
        ],
        "Laticínios": [
            { id: 7, nome: "Leite Integral", descricao: "Leite integral, 1l", imagemUrl: "imagens/leite.jpg", preco: "3,59" },
            { id: 8, nome: "Queijo", descricao: "Queijo", imagemUrl: "imagens/queijo.jpg", preco: "50,90" },
            { id: 9, nome: "Iogurte Natural", descricao: "Iogurte natural, 320g", imagemUrl: "imagens/iogurte.jpg", preco: "2,99" }
        ],
        "Produtos de Limpeza": [
            { id: 10, nome: "Detergente", descricao: "Detergente líquido, 500ml", imagemUrl: "imagens/detergente.jpg", preco: "1,79" },
            { id: 11, nome: "Desinfetante", descricao: "Desinfetante multiuso, 1l", imagemUrl: "imagens/desinfetante.jpg", preco: "4,99" },
            { id: 12, nome: "Água Sanitária", descricao: "Água sanitária, 2l", imagemUrl: "imagens/agua_sanitaria.jpg", preco: "3,49" }
        ],
        "Snacks": [
            { id: 13, nome: "Batata Chips", descricao: "Batata chips, sabor original, 100g", imagemUrl: "imagens/batata_chips.jpg", preco: "6,99" },
            { id: 14, nome: "Amendoim", descricao: "Amendoim torrado e salgado, 200g", imagemUrl: "imagens/amendoim.jpg", preco: "5,49" },
            { id: 15, nome: "Bolacha Recheada", descricao: "Bolacha recheada, sabor chocolate, 150g", imagemUrl: "imagens/bolacha.jpg", preco: "2,50" }
        ]
    };
    // Cada chave do objeto 'categorias' representa uma
            // categoria de produto e contém um array de
            // objetos que representam produtos individuais.

    const secoesProdutos = document.getElementById('secoes-produtos');
    // Obtém uma referência ao elemento HTML com o ID 'secoes-produtos'. 
    // Este elemento é usado para exibir as seções de produtos na página.

    const campoPesquisa = document.getElementById('campo-pesquisa');
    // Obtém uma referência ao campo de entrada de texto usado
            // para pesquisar produtos, identificado pelo ID 'campo-pesquisa'.

    const botaoPesquisar = document.getElementById('botao-pesquisar');
    // Obtém uma referência ao botão de pesquisa, que é
            // acionado para iniciar a busca de produtos
            // baseada no texto inserido no 'campoPesquisa'.

    const botaoVerCarrinho = document.getElementById('botao-ver-carrinho');
    // Captura uma referência ao botão que, quando
            // clicado, exibe o modal do carrinho de compras.

    const contadorCarrinho = document.getElementById('contador-carrinho');
    // Referência ao elemento que exibe o número de itens no
            // carrinho, permitindo atualizações dinâmicas
            // ao modificar o carrinho.

    const listaItensCarrinho = document.getElementById('lista-itens-carrinho');
    // Referência à lista no modal do carrinho onde os
            // itens adicionados ao carrinho são exibidos.

    const botoesCategoria = document.querySelectorAll('.categoria');
    // Seleciona todos os elementos com a classe 'categoria', que
            // são botões usados para filtrar produtos por
            // categoria específica.

    const botaoLimparFiltro = document.getElementById('limpar-filtro');
    // Obtém uma referência ao botão que limpa todos os
            // filtros ativos, mostrando todos os produtos disponíveis.

    const modalProduto = new bootstrap.Modal(document.getElementById('modalProduto'));
    // Cria uma instância do modal de Bootstrap para o
            // produto, permitindo mostrar e esconder o
            // modal programaticamente.

    const imagemProduto = document.getElementById('imagem-produto');
    // Referência ao elemento de imagem dentro do modal de
            // produto, onde a imagem do produto selecionado é exibida.

    const nomeProduto = document.getElementById('nome-produto');
    // Referência ao elemento que exibe o nome do produto no
            // modal de detalhes do produto.

    const descricaoProduto = document.getElementById('descricao-produto');
    // Obtém uma referência ao elemento que exibe a
            // descrição do produto no modal de detalhes do produto.

    const precoProduto = document.getElementById('preco-produto');
    // Referência ao elemento que mostra o preço do
            // produto no modal de detalhes do produto.

    const quantidadeProduto = document.getElementById('quantidade-produto');
    // Captura uma referência ao campo de entrada onde o
            // usuário pode especificar a quantidade do
            // produto que deseja adicionar ao carrinho.

    const botaoAdicionarCarrinhoModal = document.getElementById('botao-adicionar-carrinho-modal');
    // Referência ao botão no modal de detalhes do produto que,
            // quando clicado, adiciona o produto ao carrinho com a
            // quantidade especificada.


    
    function atualizarExibicaoProdutos(categoriasFiltradas) {
    // Define a função 'atualizarExibicaoProdutos', que é
            // responsável por atualizar a seção de produtos no
            // DOM com base nas categorias filtradas fornecidas.

        secoesProdutos.innerHTML = '';
        // Limpa todo o conteúdo dentro do elemento 'secoesProdutos'. 
        // Isso é necessário para remover a exibição anterior de
                // produtos antes de adicionar novos produtos filtrados.

        Object.keys(categoriasFiltradas).forEach(categoria => {
            // Usa 'Object.keys' para obter um array de chaves do
                    // objeto 'categoriasFiltradas' (nomes das categorias).
            // 'forEach' itera sobre cada chave (categoria) para
                    // processar os produtos dentro dessa categoria.

            if (categoriasFiltradas[categoria].length > 0) {
                // Verifica se a lista de produtos na categoria atual
                        // tem algum item. Se sim, procede à criação
                        // de elementos para exibição.

                let secao = document.createElement('section');
                // Cria um novo elemento <section>, que será usado
                        // para agrupar produtos de uma mesma categoria.

                let h2 = document.createElement('h2');
                // Cria um elemento <h2>, que será usado para exibir o
                        // nome da categoria como um cabeçalho na seção.

                h2.textContent = categoria;
                // Define o texto do elemento <h2> para o nome da
                        // categoria, que serve como título para essa
                        // seção de produtos.

                secao.appendChild(h2);
                // Adiciona o elemento <h2> ao elemento <section>
                        // recém-criado, colocando o título na seção.

                let linha = document.createElement('div');
                // Cria um novo elemento <div> que será usado para
                        // organizar visualmente os produtos da
                        // categoria em uma linha.

                linha.className = 'row';
                // Atribui a classe 'row' ao elemento <div>. Esta é
                        // uma classe típica de frameworks CSS como
                        // Bootstrap, que usa o sistema de grid para
                        // alinhar elementos horizontalmente.

                categoriasFiltradas[categoria].forEach(produto => {
                // Itera sobre cada 'produto' no array de
                        // 'categoriasFiltradas' para a categoria atual.
                // 'forEach' aplica uma função a cada item do array,
                        // permitindo manipular cada produto individualmente.
                
                    let coluna = document.createElement('div');
                    // Cria um novo elemento <div> que servirá como
                            // uma coluna no layout de grade (grid) do Bootstrap.
                
                    coluna.className = 'col-md-4';
                    // Atribui a classe 'col-md-4' ao elemento <div> recém-criado.
                    // Esta classe define que a coluna ocupa 4 de 12 colunas
                            // possíveis no grid para telas de tamanho
                            // médio (md), garantindo responsividade.
                
                    let cartao = document.createElement('div');
                    // Cria outro elemento <div> que será usado como
                            // um "cartão" para exibir as informações do produto.
                
                    cartao.className = 'card';
                    // Atribui a classe 'card' ao elemento <div>. Essa
                            // classe é parte do Bootstrap e é usada
                            // para aplicar um estilo de contêiner com
                            // bordas e preenchimento.
                
                    // Configura o conteúdo interno do 'cartão' com as
                            // informações do produto.
                    cartao.innerHTML = `
                    <img src="${produto.imagemUrl}" class="bg-imagem-topo" alt="${produto.nome}" data-bs-toggle="modal" data-bs-target="#modalProduto" data-produto-id="${produto.id}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">${produto.descricao}</p>
                        <p class="card-text"><strong>Preço: R$ ${produto.preco}</strong></p>
                        <button class="btn btn-primary adicionar-ao-carrinho" data-produto-id="${produto.id}">Adicionar ao Carrinho</button>
                    </div>`;

                    // Cria uma tag <img> com várias configurações:
                    // 'src' define o caminho para a imagem do produto.
                    // 'class="bg-imagem-topo"' aplica estilos para
                            // garantir que a imagem se ajuste bem no topo do cartão.
                    // 'alt' fornece texto alternativo para acessibilidade.
                    // 'data-bs-toggle' e 'data-bs-target' são atributos
                            // para controlar o modal do Bootstrap, permitindo
                            // que ele seja aberto ao clicar na imagem.
                    // 'data-produto-id' armazena o ID do produto, que
                            // pode ser usado para identificar qual produto
                            // deve ser mostrado no modal quando a imagem é clicada.

                    // Utiliza um <h5> para o nome do produto, com a
                            // classe 'card-title' para estilo.
                    // Exibe a descrição do produto em um <p> com a classe 'card-text'.
                    // Mostra o preço do produto, destacando-o com a tag <strong>.
                    // Cria um botão que permite adicionar o produto ao carrinho de compras.
                    // 'btn btn-primary' são classes do Bootstrap para estilizar o botão.
                    // 'data-produto-id' é usado para identificar qual
                            // produto adicionar ao carrinho quando o botão é clicado.

                    coluna.appendChild(cartao);
                    // Adiciona o 'cartão' à 'coluna'. Este cartão contém
                            // todas as informações do produto e botões
                            // de ação configurados acima.

                
                    linha.appendChild(coluna);
                    // Adiciona a 'coluna' à 'linha' existente, que foi
                            // criada anteriormente para organizar os
                            // produtos em uma grade horizontal.
                
                });
                
                secao.appendChild(linha);
                // Adiciona a 'linha' completa de produtos à 'secao'.
                
                secoesProdutos.appendChild(secao);
                // Finalmente, adiciona a 'secao' ao elemento
                        // principal 'secoesProdutos' que contém
                        // todas as seções de produtos.
                
            }
        });


        // Adiciona os eventos de clique nos botões "Adicionar ao Carrinho"
        document.querySelectorAll('.adicionar-ao-carrinho').forEach(botao => {
            
            // Utiliza 'document.querySelectorAll' para selecionar
                    // todos os elementos no documento com a
                    // classe 'adicionar-ao-carrinho'.
            // 'forEach' é aplicado a cada elemento retornado
                    // pela seleção, e para cada botão encontrado, a
                    // função fornecida é executada.
            // 'botao' é a variável que representa cada elemento
                    // iterado, que neste contexto, é cada botão
                    // de adicionar ao carrinho.

            botao.addEventListener('click', function() {
                // Adiciona um ouvinte de evento de clique ao 'botao'.
                        // Quando o botão é clicado, a função
                        // anônima (função sem nome) especificada é chamada.
                // 'addEventListener' é um método que registra uma
                        // função para ser chamada sempre que o
                        // evento especificado (neste caso, 'click')
                        // acontece no elemento.

                const idProduto = parseInt(this.getAttribute('data-produto-id'));
                // 'this' dentro do manipulador de evento se
                        // refere ao elemento ao qual o ouvinte de
                        // evento foi adicionado, ou seja, o botão
                        // que foi clicado.
                // 'getAttribute' é um método que obtém o valor de
                        // um atributo do elemento; 'data-produto-id' é
                        // um atributo personalizado definido no HTML que
                        // armazena o ID do produto.
                // 'parseInt' é uma função que converte seu argumento de
                        // string para um inteiro. Isso é usado aqui para
                        // transformar o ID do produto de uma string
                        // para um número, pois os IDs geralmente são
                        // manipulados como números.

                adicionarAoCarrinho(idProduto);
                // Chama a função 'adicionarAoCarrinho', passando
                        // o 'idProduto' como argumento.
                // Esta função é responsável por adicionar o produto
                        // especificado ao carrinho de compras, utilizando o
                        // ID para identificar qual produto adicionar.

            });
        });


        // Adiciona os eventos de clique nas imagens dos
                // produtos para abrir o modal de detalhes
        document.querySelectorAll('.bg-imagem-topo').forEach(imagem => {
            // Utiliza 'document.querySelectorAll' para selecionar
                    // todas as imagens que têm a classe 'bg-imagem-topo'.
            // O método 'forEach' itera sobre cada imagem encontrada,
                    // executando a função fornecida para cada uma.

            imagem.addEventListener('click', function() {
            // Adiciona um ouvinte de evento de clique a cada
                    // imagem. Quando a imagem é clicada, a
                    // função anônima é executada.
            // 'addEventListener' é um método que vincula uma
                    // função a ser chamada sempre que o evento
                    // especificado (neste caso, 'click') ocorre no elemento.

                const idProduto = parseInt(this.getAttribute('data-produto-id'));
                // 'this' refere-se ao elemento imagem que foi clicado.
                // 'getAttribute' obtém o valor do atributo 'data-produto-id'
                        // da imagem, que armazena o ID do produto associado.
                // 'parseInt' converte a string do ID em um número
                        // inteiro, que é necessário para processamento posterior.

                const produto = obterProdutoPorId(idProduto);
                // Chama a função 'obterProdutoPorId', passando o 'idProduto'
                        // como argumento para buscar os detalhes
                        // completos do produto no banco de dados ou na
                        // estrutura de dados local.

                if (produto) {
                // Verifica se um produto foi efetivamente retornado
                        // pela função 'obterProdutoPorId'.

                    imagemProduto.src = produto.imagemUrl;
                    // Atualiza a propriedade 'src' do elemento 'imagemProduto'
                            // para mostrar a imagem do produto selecionado no modal.

                    nomeProduto.textContent = produto.nome;
                    // Define o texto do elemento 'nomeProduto' para o
                            // nome do produto, atualizando o conteúdo no modal.

                    descricaoProduto.textContent = produto.descricao;
                    // Atualiza a descrição do produto no
                            // elemento 'descricaoProduto' dentro do modal.

                    precoProduto.textContent = produto.preco;
                    // Exibe o preço do produto no elemento 'precoProduto'.

                    botaoAdicionarCarrinhoModal.setAttribute('data-produto-id', produto.id);
                    // Define o atributo 'data-produto-id' do botão
                            // 'botaoAdicionarCarrinhoModal' para o ID do produto,
                            // permitindo que o botão saiba qual produto
                            // adicionar ao carrinho se clicado.

                    quantidadeProduto.value = 1; // Resetar a quantidade para 1
                    // Reseta o valor do campo de quantidade no
                            // modal para 1 cada vez que o modal é
                            // aberto, garantindo que o usuário comece
                            // com uma quantidade padrão.

                    modalProduto.show();
                    // Chama o método 'show' do 'modalProduto' para
                            // exibir o modal, tornando-o visível na
                            // tela com os detalhes do produto atualizados.

                }
            });
        });

    }

    

    function adicionarAoCarrinho(idProduto, quantidade = 1) {
    // Define a função 'adicionarAoCarrinho', que adiciona um
            // produto ao carrinho ou incrementa sua
            // quantidade se já estiver presente.
    // 'idProduto' é o identificador único do
            // produto a ser adicionado.
    // 'quantidade' é o número de unidades do produto a
            // ser adicionado. Se não especificado, o padrão é 1.

        const produto = obterProdutoPorId(idProduto);
        // Chama a função 'obterProdutoPorId' para buscar o
                // produto pelo seu 'idProduto' dentro da
                // estrutura de dados que representa o
                // estoque ou catálogo.
        // 'produto' será o objeto representando o produto se
                // encontrado, ou 'undefined' se não houver
                // produto com esse ID.
    
        if (!produto) return;
        // Verifica se o produto foi encontrado.
                // Se 'produto' for 'undefined' (não encontrado),
                // a função termina prematuramente.
        // 'return' sem um valor encerra a execução da
                // função sem fazer mais nada.
    
        const produtoExistente = carrinho.find(item => item.id === produto.id);
        // Busca no array 'carrinho' para ver se o
                // produto já existe nele.
        // 'find()' retorna o primeiro elemento que
                // satisfaz a condição especificada na função de
                // callback, ou 'undefined' se nenhum elemento a satisfaz.
    
        if (produtoExistente) {

            produtoExistente.quantidade += quantidade;
            // Se o produto já existe no carrinho ('produtoExistente' não
                    // é 'undefined'), incrementa a 'quantidade'
                    // existente do produto.

        } else {

            carrinho.push({ ...produto, quantidade: quantidade });
            // Se o produto não está no carrinho, adiciona-o com a
                    // propriedade 'quantidade' especificada.
            // '{ ...produto, quantidade: quantidade }' cria um novo
                    // objeto copiando todas as propriedades de 'produto' e
                    // adicionando/atualizando a propriedade 'quantidade'.

        }
    
        atualizarContadorCarrinho();
        // Chama a função 'atualizarContadorCarrinho' para
                // atualizar a exibição do contador de itens no
                // carrinho e salvar o estado atualizado no localStorage.

    }


    function obterProdutoPorId(id) {
        // Define a função 'obterProdutoPorId', que busca
                // um produto pelo seu ID dentro das
                // categorias de produtos disponíveis.
        
        for (let categoria in categorias) {
            // Itera sobre cada categoria no objeto 'categorias'. 'categoria'
                    // refere-se à chave do objeto (nome da categoria).
            
            const produto = categorias[categoria].find(item => item.id === id);
            // Dentro de cada categoria, usa 'find()' para
                    // buscar o primeiro produto que tenha um 'id'
                    // que corresponda ao 'id' fornecido.
            // 'find()' retorna o objeto do produto se
                    // encontrado, ou 'undefined' se nenhum
                    // produto corresponder.
    
            if (produto) return produto;
            // Se um produto é encontrado (ou seja, 'produto'
                    // não é 'undefined'), retorna esse produto
                    // imediatamente, terminando a função.

        }
    
        return null;
        // Após verificar todas as categorias, se nenhum
                // produto for encontrado com o 'id'
                // especificado, retorna 'null'.
        // 'null' é usado aqui para indicar explicitamente
                // que nenhum produto foi encontrado.

    }


    function exibirCarrinho() {
        // Define a função 'exibirCarrinho', responsável por
                // atualizar e exibir o conteúdo do carrinho
                // de compras no modal correspondente.
    
        listaItensCarrinho.innerHTML = ''; // Limpa a lista
                // antes de adicionar os itens
        // Define o conteúdo interno de 'listaItensCarrinho' (um
                // elemento <ul> ou <ol>) como vazio, removendo
                // quaisquer elementos filho que existiam antes, para
                // preparar para uma nova listagem de itens.
    
        if (carrinho.length === 0) {
            // Verifica se o array 'carrinho' está vazio.
            
            let mensagemVazia = document.createElement('li');
            // Cria um novo elemento <li> que será usado para
                    // mostrar uma mensagem quando o carrinho estiver vazio.
    
            mensagemVazia.textContent = 'Seu carrinho está vazio.';
            // Define o texto do elemento <li> para informar ao
                    // usuário que não há itens no carrinho.
    
            mensagemVazia.className = 'list-group-item';
            // Atribui a classe 'list-group-item' ao elemento <li> para
                    // estilização consistente com o framework
                    // Bootstrap ou CSS personalizado.
    
            listaItensCarrinho.appendChild(mensagemVazia);
            // Adiciona o elemento <li> ao elemento pai 'listaItensCarrinho',
                    // efetivamente exibindo a mensagem de carrinho vazio.

        } else {
            // Caso haja itens no carrinho, procede para listá-los.
    
            carrinho.forEach(item => {
                // Itera sobre cada 'item' no array 'carrinho'.
    
                let itemLista = document.createElement('li');
                // Cria um novo elemento <li> para cada item do carrinho.
    
                itemLista.className = 'list-group-item d-flex justify-content-between align-items-center';
                // Atribui classes para estilização e layout
                        // flexível, usando Bootstrap para alinhar os
                        // conteúdos de forma responsiva e esteticamente agradável.
    
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
                // Configura o HTML interno do <li>, incluindo uma
                        // divisão com a imagem do produto, detalhes
                        // como nome, preço, e quantidade,
                // e um botão para remover o item do carrinho, utilizando
                        // atributos 'data-' para identificar qual item remover.
    
                listaItensCarrinho.appendChild(itemLista);
                // Adiciona o elemento <li> configurado à lista 'listaItensCarrinho',
                        // exibindo o item no carrinho.

            });
    
            let itemTotal = document.createElement('li');
            // Cria outro elemento <li> para exibir o total do carrinho.
    
            itemTotal.className = 'list-group-item list-group-item-dark';
            // Atribui classes para estilização, usando uma
                    // classe Bootstrap para diferenciar visualmente o
                    // total dos itens individuais.
    
            let total = carrinho.reduce((acc, item) => acc + (parseFloat(item.preco.replace(',', '.')) * item.quantidade), 0);
            // Calcula o total do carrinho. Converte o preço de
                    // string para float e soma os produtos das
                    // quantidades pelos preços.
    
            itemTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
            // Define o texto do elemento <li> do total para mostrar o
                    // valor total calculado, formatado para duas casas decimais.
    
            listaItensCarrinho.appendChild(itemTotal);
            // Adiciona o elemento <li> do total à lista 'listaItensCarrinho',
                    // exibindo o total no carrinho.

        }
        

        // Adiciona os eventos de clique nos botões "Remover"
        document.querySelectorAll('.remover-do-carrinho').forEach(botao => {
            // Usa 'document.querySelectorAll' para selecionar todos os
                    // elementos com a classe 'remover-do-carrinho'.
            // 'forEach' itera sobre cada botão encontrado, executando
                    // a função fornecida para cada um.

            botao.addEventListener('click', function() {
            // Adiciona um ouvinte de evento de clique ao botão. Quando
                    // clicado, a função anônima será executada.

                const idProduto = parseInt(this.getAttribute('data-produto-id'));
                // Dentro do manipulador de clique, 'this' refere-se
                        // ao botão que foi clicado.
                // 'getAttribute' obtém o valor do atributo 'data-produto-id',
                        // que é uma string contendo o ID do produto.
                // 'parseInt' converte essa string para um número inteiro,
                        // que é o ID do produto a ser removido.

                removerDoCarrinho(idProduto);
                // Chama a função 'removerDoCarrinho' com o 'idProduto'
                        // como argumento, que remove o produto
                        // especificado do carrinho.

            });
        });

        let modalCarrinho = new bootstrap.Modal(document.getElementById('modalCarrinho'), {});
        // Cria uma nova instância do modal do Bootstrap para o
                // elemento com ID 'modalCarrinho'.
        // A instância é armazenada na variável 'modalCarrinho'. Um
                // objeto de opções vazio é passado como segundo argumento.

        modalCarrinho.show();
        // Chama o método 'show' na instância 'modalCarrinho' para
                // exibir o modal. Isso faz o modal se tornar visível
                // na interface do usuário.

        modalCarrinho._element.addEventListener('hidden.bs.modal', function() {
            // Adiciona um ouvinte de evento ao elemento do modal
                    // que detecta quando o modal é fechado.
            // 'hidden.bs.modal' é um evento específico do Bootstrap
                    // que é disparado após o modal ser completamente escondido.

            window.location.href = "index.html";
            // Redireciona o navegador para a página 'index.html'.
            // Esta linha é executada quando o evento 'hidden.bs.modal' é
                    // disparado, indicando que o modal foi fechado.

        });

    }


    function removerDoCarrinho(idProduto) {
        // Define a função 'removerDoCarrinho', que remove um
                // produto do carrinho de compras com base no seu ID.
        
        carrinho = carrinho.filter(item => item.id !== idProduto);
        // Atualiza o array 'carrinho' para incluir apenas os
                // itens cujo 'id' é diferente do 'idProduto'.
        // 'filter()' cria um novo array contendo apenas os
                // elementos que não correspondem ao 'idProduto',
                // efetivamente removendo o item desejado.
    
        atualizarContadorCarrinho();
        // Chama a função 'atualizarContadorCarrinho' para
                // atualizar a exibição do contador de itens no
                // carrinho e salvar o estado atualizado no localStorage.
    
        exibirCarrinho();
        // Chama a função 'exibirCarrinho' para atualizar a
                // exibição visual do carrinho no site, mostrando os
                // itens restantes após a remoção.

    }



    function atualizarContadorCarrinho() {
        // Define a função 'atualizarContadorCarrinho', que é
                // responsável por atualizar a interface do
                // usuário e o armazenamento local com o
                // número de itens no carrinho.
    
        contadorCarrinho.textContent = `${carrinho.length} itens`;
        // Atualiza o texto do elemento 'contadorCarrinho' para
                // mostrar o número de itens no array 'carrinho'.
        // 'carrinho.length' obtém o número de itens no carrinho, e o
                // texto é formado usando uma template string para
                // incluir a palavra "itens" após o número.
    
        localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
        // Salva o estado atual do carrinho no armazenamento
                // local do navegador para persistência de dados.
        // 'JSON.stringify(carrinho)' converte o array 'carrinho' em
                // uma string JSON para que possa ser armazenado
                // corretamente, pois o armazenamento local só
                // suporta strings.

    }


    botaoAdicionarCarrinhoModal.addEventListener('click', function() {
    // Adiciona um ouvinte de evento de clique ao
            // botão 'botaoAdicionarCarrinhoModal'.
    // Quando o botão é clicado, a função anônima
            // especificada é executada.
    // 'addEventListener' é um método usado para registrar um
            // manipulador de evento, neste caso, para o
            // evento de clique.
    
        const idProduto = parseInt(this.getAttribute('data-produto-id'));
        // Dentro da função, 'this' refere-se ao botão
                // 'botaoAdicionarCarrinhoModal' que foi clicado.
        // 'getAttribute' é usado para recuperar o valor do
                // atributo 'data-produto-id', que armazena o
                // ID do produto associado ao botão.
        // 'parseInt' converte o valor do ID, que é uma
                // string, em um número inteiro. Isso é necessário
                // para a manipulação correta do ID no JavaScript.
    
        const quantidade = parseInt(quantidadeProduto.value);
        // 'quantidadeProduto' é um elemento de entrada no
                // modal onde o usuário pode especificar a
                // quantidade do produto que deseja adicionar ao carrinho.
        // 'quantidadeProduto.value' acessa o valor atual
                // dessa entrada, que é uma string.
        // 'parseInt' também é usado aqui para converter essa
                // string para um número inteiro, representando a
                // quantidade do produto a ser adicionada ao carrinho.
    
        adicionarAoCarrinho(idProduto, quantidade);
        // Chama a função 'adicionarAoCarrinho',
                // passando 'idProduto' e 'quantidade' como argumentos.
        // Esta função é responsável por adicionar o produto
                // especificado, na quantidade especificada,
                // ao carrinho de compras.
    
        modalProduto.hide();
        // Após adicionar o item ao carrinho, este comando
                // oculta o modal de detalhes do produto.
        // 'hide' é um método do objeto modal do Bootstrap que
                // fecha o modal, removendo-o da visualização do usuário.

    });


    botaoPesquisar.addEventListener('click', function() {
    // Adiciona um ouvinte de evento de clique ao
                // botão 'botaoPesquisar'.
    // Quando o botão é clicado, a função anônima
                // especificada é executada.
    // 'addEventListener' é um método que registra um
                // manipulador de eventos, neste caso, para o
                // evento de clique.

        const termoPesquisa = campoPesquisa.value.toLowerCase();
        // Obtém o valor atual do campo de pesquisa 'campoPesquisa',
                // que é onde os usuários inserem o texto que
                // desejam pesquisar.
        // 'toLowerCase' é usado para converter o texto de
                // pesquisa para letras minúsculas, garantindo que a
                // pesquisa não seja sensível a maiúsculas ou minúsculas.

        const categoriasFiltradas = {};
        // Inicializa um objeto vazio 'categoriasFiltradas'. Este
                // objeto será usado para armazenar as categorias e os
                // produtos filtrados que correspondem ao termo de pesquisa.

        Object.keys(categorias).forEach(categoria => {
            // 'Object.keys(categorias)' obtém todas as chaves do
                    // objeto 'categorias' (que são os nomes das
                    // categorias de produtos).
            // 'forEach' é usado para iterar sobre cada categoria.

            categoriasFiltradas[categoria] = categorias[categoria].filter(produto => {
                // Para cada categoria, filtra os produtos que
                        // incluem o termo de pesquisa no nome.
                // 'filter' é um método de array que cria um novo
                        // array com todos os elementos que passam no
                        // teste implementado pela função fornecida.

                return produto.nome.toLowerCase().includes(termoPesquisa);
                // 'toLowerCase' é usado para garantir que a
                        // comparação do nome do produto com o
                        // termo de pesquisa seja feita de maneira
                        // não sensível a maiúsculas/minúsculas.
                // 'includes' verifica se o nome do produto contém o
                        // termo de pesquisa fornecido.

            });
        });

        atualizarExibicaoProdutos(categoriasFiltradas);
        // Chama a função 'atualizarExibicaoProdutos' com o
                // objeto 'categoriasFiltradas'.
        // Esta função é responsável por atualizar a interface do
                // usuário para mostrar apenas os produtos que
                // correspondem ao termo de pesquisa.

    });


     botoesCategoria.forEach(botao => {
    // 'botoesCategoria' é uma coleção de elementos de botão,
                // cada um representando uma categoria de produto.
    // 'forEach' itera sobre cada botão na coleção, executando a
                // função fornecida para cada um.

        botao.addEventListener('click', function() {
            // Adiciona um ouvinte de evento de clique a
                    // cada botão de categoria.
            // Quando um botão é clicado, a função anônima
                    // especificada é chamada.
            // 'addEventListener' é um método que registra uma
                    // função a ser chamada sempre que o evento
                    // especificado (neste caso, 'click') ocorre no elemento.

            const categoria = this.getAttribute('data-categoria');
            // 'this' refere-se ao botão de categoria que foi clicado.
            // 'getAttribute' é usado para recuperar o valor do
                    // atributo 'data-categoria' do botão.
            // Este atributo 'data-categoria' contém o nome
                    // da categoria que o botão representa.

            const categoriasFiltradas = {};
            // Inicializa um objeto vazio 'categoriasFiltradas'.
                    // Este objeto será usado para armazenar a
                    // categoria específica e seus produtos correspondentes.

            categoriasFiltradas[categoria] = categorias[categoria];
            // Atribui ao objeto 'categoriasFiltradas' uma
                    // chave que é o nome da categoria com o valor
                    // sendo a lista de produtos dessa categoria.
            // 'categorias[categoria]' acessa a lista de produtos para a
                    // categoria específica do objeto 'categorias'.

            atualizarExibicaoProdutos(categoriasFiltradas);
            // Chama a função 'atualizarExibicaoProdutos', passando o
                    // objeto 'categoriasFiltradas' como argumento.
            // Esta função é responsável por atualizar a interface do
                    // usuário para mostrar apenas os produtos da
                    // categoria selecionada.

        });
    });


    botaoLimparFiltro.addEventListener('click', function() {
    // Adiciona um ouvinte de evento de clique ao botão 'botaoLimparFiltro'.
    // Este botão é responsável por remover todos os
            // filtros atuais aplicados à visualização de produtos.
    // Quando o botão é clicado, a função anônima
            // especificada é executada.

        atualizarExibicaoProdutos(categorias);
        // Chama a função 'atualizarExibicaoProdutos' passando o
                // objeto 'categorias' inteiro.
        // Isso faz com que a exibição de produtos na
                // interface do usuário seja atualizada para
                // mostrar todos os produtos disponíveis,
                // independentemente da categoria.
        
    });

    // Inicializa a lista com todos os produtos
    atualizarExibicaoProdutos(categorias); 
    // Esta linha é executada assim que o script é carregado,
            // garantindo que todos os produtos sejam exibidos inicialmente.
    // Chama a função 'atualizarExibicaoProdutos' com o objeto
            // completo de 'categorias', o que resulta na criação
            // inicial da exibição de todos os produtos disponíveis.

    botaoVerCarrinho.addEventListener('click', exibirCarrinho);
    // Adiciona um ouvinte de evento de clique ao botão 'botaoVerCarrinho'.
    // 'exibirCarrinho' é uma função que, quando chamada, mostra o
            // modal ou a interface com os itens atualmente no
            // carrinho de compras.
    // Este ouvinte vincula diretamente a função 'exibirCarrinho' ao
            // evento de clique, facilitando a visualização do
            // carrinho pelo usuário a qualquer momento.

    // Atualiza a contagem ao carregar a página
    atualizarContadorCarrinho(); 
    // Esta chamada de função é executada assim que o script
            // carrega, atualizando o contador de itens no carrinho.
    // 'atualizarContadorCarrinho' verifica quantos itens
            // estão atualmente no carrinho (usando dados
            // salvos no localStorage) e atualiza a
            // interface do usuário para refletir essa quantidade.
    
    
});