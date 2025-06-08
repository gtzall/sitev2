# Plano de Desenvolvimento: Aprimoramentos Avançados Sport AG

Este documento detalha o plano para implementar a lista de aprimoramentos avançados solicitada para o site Sport AG. Cada item será abordado em fases, buscando entregar valor incrementalmente.

**Fase 1: Base Visual e Interativa**

1.  **Implementar Modo Claro/Escuro (Passo 007):**
    *   Definir variáveis CSS para ambas as paletas (clara e escura) com base no `hybrid_color_palette.md`.
    *   Criar um componente de botão/toggle para alternar o tema.
    *   Implementar a lógica de troca de tema (provavelmente usando `localStorage` e classes no `body` ou `html`).
    *   Ajustar todos os componentes existentes para usar as variáveis de cor do tema.
    *   Testar a consistência visual em ambos os modos.
2.  **Adicionar Micro-interações (Passo 006):**
    *   Identificar elementos chave: ícones de navegação, links de footer, botões de adicionar ao carrinho, ícone do carrinho.
    *   Aplicar animações sutis de hover (escala, brilho leve) e clique (`whileTap`) usando Framer Motion.
    *   Adicionar uma animação sutil ao adicionar item ao carrinho (ex: ícone do carrinho "pulsa" brevemente).
    *   Testar a fluidez e o impacto visual das micro-interações.
3.  **Tornar Seção "Sobre Nós" Mais Visual (Passo 009):**
    *   Revisar o componente `AboutUs`.
    *   Integrar uma imagem de fundo com efeito paralaxe sutil ou incorporar um vídeo curto sobre a marca (precisaremos definir/obter o vídeo).
    *   Ajustar o layout do texto para melhor integração com o novo elemento visual.
    *   Garantir responsividade.

**Fase 2: Conteúdo Gráfico e Funcionalidade Essencial**

4.  **Implementar Composições Gráficas (Cards/Banners) (Passo 003):**
    *   **Recursos:** Buscar imagens de alta qualidade de jogadores icônicos (Mbappé, Haaland, Vini Jr., CR7, Kaká, Neymar, Messi, etc.) com licença apropriada ou que possam ser usadas sob fair use para design conceitual.
    *   **Design:** Criar as composições gráficas para os 4 Cards de Categoria (Europeus, Retrôs, Seleções, América) e pelo menos 1 Banner Promocional (ex: "Pague 2 Leve 3") no estilo das referências, usando ferramentas de design gráfico (simulado via `image_generate` ou solicitando ao usuário se possível).
    *   **Integração:** Substituir os placeholders nos componentes `CategoryCard` e `PromoBanner` pelas imagens criadas.
    *   **Placeholder:** Se a criação gráfica não for viável via `image_generate`, manter placeholders mais elaborados ou solicitar as imagens prontas ao usuário.
5.  **Adicionar Animações Elaboradas (Cards de Categoria) (Passo 004):**
    *   Aplicar efeito de paralaxe sutil nas imagens de fundo dos `CategoryCard` ao passar o mouse.
    *   Adicionar um efeito de brilho suave ou animação no texto do card durante o hover.
    *   Testar performance e fluidez.
6.  **Criar Filtros Avançados (Passo 008):**
    *   Definir critérios: Liga, Temporada (se aplicável aos dados), Tipo (Jogador/Torcedor - *precisa adicionar aos dados*), País/Região (já existente).
    *   Desenvolver a UI do modal/sidebar de filtros.
    *   Implementar a lógica de filtragem no `page.tsx` para atualizar `filteredJerseys`.
    *   Integrar a UI com a lógica.
    *   Testar a funcionalidade dos filtros.

**Fase 3: Polimento e Otimização**

7.  **Integrar Imagens Reais de Camisas (Passo 005):**
    *   **Dependência:** Aguardar o recebimento das imagens no estilo Yupoo.
    *   Substituir os URLs placeholder nos dados `jerseys` pelos caminhos das imagens reais.
    *   Testar a exibição correta em todos os componentes.
    *   **Visualização 360º (Opcional):** Pesquisar bibliotecas React para visualização 360º (ex: `react-image-turntable`). Implementar como teste em 1-2 produtos se as imagens 360º estiverem disponíveis.
8.  **Integrar Feedbacks Visuais (Passo 011):**
    *   Adicionar dados de avaliação (estrelas, número de reviews) aos dados `jerseys` (placeholder).
    *   Modificar o `PremiumJerseyCard` para exibir as estrelas de avaliação.
    *   Criar/Ajustar o componente `PublicReviews` para um layout mais visual e integrado.
9.  **Otimizar Performance (Passo 010):**
    *   Analisar o tamanho das imagens e otimizá-las (ex: usar formatos como WebP).
    *   Verificar o carregamento de componentes (code splitting já deve estar ok com Next.js).
    *   Otimizar o carregamento do modelo 3D.
    *   Avaliar o desempenho geral usando ferramentas de navegador.

**Validação e Entrega Final (Passos 012 e 013):**

*   Após cada fase ou conjunto de funcionalidades, realizar testes completos de funcionalidade, visualização e responsividade.
*   Apresentar o progresso ao usuário para feedback.
*   Realizar a entrega final da versão aprimorada com toda a documentação.

**Priorização Sugerida:** Seguir as fases 1, 2 e 3 nesta ordem parece lógico, construindo a base visual e interativa primeiro, depois adicionando conteúdo gráfico e funcionalidades chave, e por fim polindo e otimizando.

**Observação:** A implementação de alguns itens depende de recursos externos (imagens de jogadores, imagens de camisas, imagens 360º). Usaremos placeholders ou alternativas caso esses recursos não estejam disponíveis.

