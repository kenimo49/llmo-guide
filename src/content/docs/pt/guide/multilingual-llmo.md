---
title: LLMO Multilíngue
description: "Traduzir conteúdo é necessário, mas não suficiente para visibilidade em IA em múltiplos idiomas. Motores de IA frequentemente citam a versão em inglês para leitores em outros idiomas. O que hreflang, canonicals e llms.txt por idioma realmente fazem — e a assimetria que torna idiomas não ingleses o investimento com maior ROI."
pubDate: 2026-07-07
---

**Traduzir seu conteúdo é necessário e não suficiente.** Em 2026 existe uma lacuna real e mensurável entre "publiquei uma versão em português" e "a busca por IA cita minha versão em português." Este guia cobre os dois problemas multilíngues que o LLMO precisa resolver: fazer com que os motores de IA citem a versão no *idioma certo*, e decidir *quais* idiomas compensam o investimento.

## O problema da citação no idioma errado

Um motor de busca clássico resolve *qual documento* servir e o serve. O `hreflang` é um sinal de ranqueamento no qual ele foi calibrado por duas décadas, e o Google é genuinamente bom em escolher a URL no idioma correspondente.

Um motor baseado em LLM faz algo diferente: recupera alguns documentos, gera uma resposta no idioma do usuário e então anexa os URLs que a camada de recuperação trouxe à tona. A etapa de geração é fluidamente multilíngue. A etapa de recuperação é onde a seleção de idioma acontece, e ela frequentemente tem um viés para o inglês.

O resultado observável, a partir de um teste entre motores com a mesma consulta multilíngue (Glenn Gabe, GSQI) e o acompanhamento de citações de um site em quatro idiomas:

- **Motores baseados no Google** (AI Overviews, AI Mode, Gemini, Copilot) herdam décadas de tratamento de `hreflang` e geralmente citam a URL localizada correta.
- **O Perplexity**, configurado para preferir o francês, retornou a página em inglês americano de qualquer forma.
- **O ChatGPT** escreveu sua resposta em francês e então vinculou a versão em inglês da página. A resposta fala o idioma do leitor; a citação não.

Por que a camada de recuperação tem como padrão o inglês:

- A versão em inglês geralmente tem mais links de entrada e um histórico de rastreamento mais longo, então aparece em posição mais alta no índice de recuperação independentemente do idioma do leitor.
- Muitos crawlers de IA não processam completamente clusters de `hreflang` da mesma forma que o Googlebot.
- A qualidade da tradução é um sinal de confiança. Se uma página traduzida parece ter sido produzida por máquina, a camada de recuperação a trata como uma cópia de baixa confiança e busca o original em inglês.

A falha não é "a IA não consegue falar português." É "a camada de recuperação da IA não confia o suficiente na sua página em português para citá-la."

## O que realmente move o ponteiro, em ordem

A partir de um experimento de variável única em um site com quatro idiomas ([relatório de campo](https://kenimoto.dev/blog/ai-cites-wrong-language-version-multilingual-llmo/) (em inglês)):

1. **`hreflang` + `x-default` — fez mais.** Cada versão de idioma deve declarar o cluster completo com um `x-default` coerente. Este é o único sinal que os motores baseados no Google leem de forma confiável, e esses motores representam uma fatia grande da busca por IA. Se você fizer uma coisa, faça isso corretamente.
2. **Canonical autorreferente por idioma — criticamente importante, mas silencioso.** Cada versão de idioma deve fazer canonical para *si mesma*, não para o original em inglês. Uma página traduzida cujo canonical aponta de volta para o inglês está dizendo a todo crawler "a página real é a em inglês". É um tiro no próprio pé.
3. **`llms.txt` por idioma — pequeno, barato, provavelmente vale a pena.** Organize os links por idioma para que cada arquivo aponte para as URLs localizadas corretas. Nenhum motor principal confirmou que dá peso a isso ainda, mas custa quinze minutos por idioma, não tem desvantagem e documenta qual URL é canônica por idioma.
4. **Tentar configurar o motor — não funcionou.** Não existe configuração que faça o ChatGPT citar sua URL localizada. Não há como sair de um viés de recuperação pela configuração; só é possível alimentar a camada de recuperação com sinais mais limpos e aguardar.

Mesmo com todos os sinais corretos, espere uma lacuna residual: parte da falha está dentro das camadas de recuperação que você não controla. Você pode diminuir a lacuna, mas não fechá-la.

## Assimetria de idiomas: a vantagem estratégica

A mesma imaturidade que causa citações no idioma errado cria uma oportunidade. A concorrência em busca por IA é dramaticamente desigual entre idiomas, e os fundamentos do LLMO se compõem mais rapidamente em idiomas onde ainda são raros.

Uma medição de 22 dias no GA4 em um blog que publicava o mesmo conteúdo em quatro idiomas ([relatório de campo](https://kenimoto.dev/blog/four-languages-thirty-days-portuguese-four-x-traffic/) (em inglês)):

| Idioma | Pageviews | Artigos | Notas |
|---|---|---|---|
| Português | 748 | 17 | ~3,8× o inglês com menos artigos |
| Inglês | 195 | 26 | Mercado saturado, share of voice pequeno |
| Japonês | 27 | 25 | Leitores vivem em plataformas (Qiita/Zenn), não em blogs |
| Espanhol | 7 | 10 | Concorrência escassa, mas sem porta de entrada comunitária |

**A assimetria de idioma pode superar completamente a assimetria de quantidade de artigos.** Três assimetrias se somaram para produzir o resultado em português:

1. **Porta de entrada comunitária** — uma plataforma aberta por idioma onde um autor desconhecido é lido no mesmo dia (o Brasil tem o TabNews; o inglês não tem equivalente com um piso comparável).
2. **Campos de busca por IA mais escassos** — em português, muito menos candidatos competem pelos mesmos prompts. A primeira resposta razoável em um idioma pouco atendido vence; a primeira resposta razoável em inglês fica enterrada.
3. **Fundamentos do pioneiro** — um `/pt/llms.txt` é levemente diferenciador onde a maioria dos sites naquele idioma não publica nada; em inglês, o mesmo arquivo é mera higiene.

O modelo de distribuição também difere por idioma: o resultado japonês mostra um idioma onde o blog deve funcionar como o arquivo canônico indexado pelos crawlers de IA, enquanto as publicações em plataformas (Zenn/Qiita) fazem o trabalho de tráfego humano. Mesmo conteúdo, papéis opostos.

## Ordem de implementação

1. **Identifique a porta de entrada comunitária de cada idioma-alvo antes de traduzir.** Não o tamanho do público, e sim a porta. Se não existe uma plataforma de publicação aberta, espere o resultado do espanhol acima.
2. **Publique `/{idioma}/llms.txt` desde o primeiro dia.** Quinze minutos por idioma; a diferenciação mais barata disponível em idiomas pouco atendidos.
3. **Configure a análise com filtros de prefixo de idioma antes de publicar**, ou você estará adaptando a mensuração no segundo mês em vez de escrever.
4. **Traduza os 20% mais importantes dos artigos primeiro** — os que têm maior probabilidade de entrar pela porta da comunidade. Valide a distribuição antes de traduzir o arquivo completo.
5. **Acompanhe o share of voice em busca por IA por idioma como KPIs separados.** Execute os mesmos prompts relevantes para sua marca no ChatGPT, Perplexity e Claude em cada idioma, mensalmente ([Medindo o LLMO](/pt/guide/measuring-llmo/) cobre as métricas). As assimetrias são grandes e invisíveis até serem medidas.
6. **Edite manualmente as traduções automáticas para registro e locale.** A qualidade da tradução é um sinal de confiança de recuperação, não apenas uma cortesia com o leitor.

## Como este site implementa

O llmoframework.com publica em 8 locales com o inglês como fonte canônica. Páginas sem tradução servem o conteúdo em inglês como fallback com `noindex` e exclusão do sitemap: uma página não traduzida não deve competir com seu próprio canônico em nenhum índice de recuperação. Cada locale declara um cluster `hreflang` completo e canonicals autorreferentes.

## Checklist

- [ ] Cada versão de idioma declara o cluster `hreflang` completo, incluindo `x-default`
- [ ] Cada versão de idioma tem um canonical autorreferente (nunca apontando para o original em inglês)
- [ ] Cada diretório de idioma publica seu próprio `llms.txt` com URLs localizadas
- [ ] Páginas de fallback não traduzidas têm `noindex` e são excluídas do sitemap
- [ ] As traduções são editadas manualmente para registro e locale, não são saídas brutas de máquina
- [ ] A porta de entrada comunitária de cada idioma-alvo é identificada antes de começar a tradução
- [ ] O share of voice em busca por IA é medido por idioma, no próprio idioma, mensalmente
- [ ] O esforço de publicação é direcionado para idiomas pouco atendidos, não para a contagem total de falantes
