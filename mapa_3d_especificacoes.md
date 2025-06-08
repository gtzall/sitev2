# Especificações do Mapa Mundi 3D Interativo - Sport AG

Este documento detalha os requisitos e especificações para a criação do mapa mundi 3D interativo para o site Sport AG, conforme solicitado.

## 1. Visão Geral

O objetivo é criar um componente visualmente impactante e interativo que permita aos usuários explorar o globo terrestre em 3D, selecionar países ou regiões e visualizar informações relevantes, incluindo os times de futebol associados àquele local. O design deve estar alinhado com a identidade visual aprovada (logo artístico, paleta híbrida azul/ciano/laranja/metálico, modos claro/escuro).

## 2. Aparência Visual (3D)

*   **Modelo do Globo:** Utilizar um modelo 3D estilizado do globo terrestre. Não precisa ser hiper-realista, pode ter um acabamento mais artístico ou low-poly sofisticado, combinando com o logo.
*   **Cores e Texturas:** Aplicar a paleta de cores aprovada. O oceano pode usar o azul profundo (`#0A2540`), os continentes/países podem usar tons de cinza metálico (`#616161` / `#BDBDBD`) ou um tom neutro que funcione bem em ambos os modos (claro/escuro). As fronteiras devem ser sutis.
*   **Iluminação:** Iluminação ambiente suave, talvez com um ponto de luz direcional para criar sombras e realçar a tridimensionalidade, alinhada ao estilo 3D do logo.
*   **Fundo:** O fundo atrás do globo deve ser transparente ou usar uma cor sólida/gradiente sutil do tema (ex: azul profundo no modo escuro, cinza claro no modo claro).

## 3. Interação

*   **Rotação:** Permitir que o usuário rotacione o globo livremente arrastando o mouse/dedo.
*   **Hover:** Ao passar o mouse sobre um país/região clicável, ele deve ser sutilmente destacado:
    *   **Animação:** Leve brilho (glow) na cor ciano (`#00BFFF`).
    *   **Cursor:** Mudar o cursor para indicar interatividade (ponteiro).
*   **Seleção (Clique):** Ao clicar em um país/região destacada:
    *   Disparar a animação de seleção (ver seção 4).
    *   Abrir o painel de informações (ver seção 5).
    *   Manter o país selecionado com um destaque mais persistente até que outro seja clicado ou o painel seja fechado.

## 4. Animações

*   **Animação de Seleção:** Ao clicar em um país:
    *   O globo deve rotacionar suavemente para centralizar o país selecionado na vista.
    *   Aplicar um leve zoom em direção ao país selecionado.
    *   O país selecionado deve receber um destaque mais intenso, talvez um brilho pulsante sutil na cor laranja (`#FF6600`) por um breve momento, depois mantendo um brilho ciano (`#00BFFF`) mais forte que o hover.
*   **Transições:** Todas as animações (rotação, zoom, brilho) devem ser suaves e fluidas.

## 5. Painel de Informações

*   **Abertura:** Surge ao selecionar um país (pode ser um painel lateral, um modal ou uma seção que aparece abaixo/ao lado do mapa).
*   **Estilo:** Deve seguir o design geral do site, respeitando os modos claro e escuro e usando a paleta de cores definida.
*   **Conteúdo:**
    *   Nome do País (grande e claro)
    *   Nome do Continente
    *   Bandeira do País (opcional, mas recomendado)
    *   **Lista de Times:** Uma seção listando os principais times de futebol daquele país. A lista deve ser rolável se for longa.
        *   *Fonte de Dados:* Inicialmente, podemos usar uma lista pré-definida. Precisamos definir quais países/times incluir ou buscar uma API/fonte de dados confiável para isso.
*   **Fechamento:** O painel deve ter um botão claro para fechar (ícone 'X'), ou fechar automaticamente ao clicar fora dele ou ao selecionar outro país.

## 6. Requisitos Técnicos

*   **Tecnologia:** Recomenda-se usar `React` (já que o projeto parece ser Next.js) com bibliotecas como `react-three-fiber` e `drei` para facilitar a integração do `three.js`.
*   **Modelo 3D:** Utilizar um modelo 3D otimizado para web (ex: formato glTF/glb).
*   **Dados Geográficos:** Precisaremos de dados geojson ou similar para mapear os países no modelo 3D e permitir a interação por clique/hover.
*   **Responsividade:** O mapa 3D e o painel de informações devem ser responsivos. Em telas menores, a interação pode ser simplificada (ex: menos detalhes no globo, painel ocupando mais tela).
*   **Desempenho:** Otimizar o componente para garantir bom desempenho e carregamento rápido, mesmo com o 3D.

## 7. Próximos Passos

*   Validar estas especificações.
*   Definir a fonte de dados para os times de futebol por país.
*   Obter/criar o modelo 3D estilizado do globo.
*   Obter os dados geográficos para interação.
*   Iniciar o desenvolvimento do componente React.
