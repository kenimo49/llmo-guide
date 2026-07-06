---
title: "Medindo o LLMO: Taxa de Citação, Densidade de Menção e Conversão de Tráfego por IA"
description: "Medir o LLMO é a prática de acompanhar se sistemas de IA citam seu conteúdo e o que essa citação vale. Três métricas centrais — Taxa de Citação, Densidade de Menção de Marca e Conversão de Tráfego por IA — substituem os KPIs de posição de ranqueamento que a busca por IA tornou obsoletos."
pubDate: 2026-07-07
---

Medir o LLMO é a prática de acompanhar se sistemas de IA citam seu conteúdo, com que profundidade o citam e o que essas citações valem para o seu negócio. Substitui os KPIs de posição de ranqueamento do SEO clássico, que não têm equivalente na busca por IA: não existe posição 1 a 100, apenas citado ou não citado.

## A Lacuna de Mensuração

A mensuração de SEO é um problema resolvido: o Google Search Console reporta ranqueamentos, impressões, cliques e CTR gratuitamente, todos os dias. O LLMO não tem equivalente. Em 2026, nenhuma plataforma de IA (OpenAI, Anthropic, Google ou Perplexity) oferece uma API oficial que informe com que frequência seu site foi citado.

Duas consequências:

1. **O tráfego de referência no GA4 é apenas a ponta do iceberg.** Quando uma IA cita você e o usuário clica no link, o GA4 registra uma referência. Quando uma IA cita você e ninguém clica (o que ocorre na maioria das vezes), nada fica registrado em nenhum lugar que você possa ver. Uma citação que nunca é clicada ainda posiciona você como a fonte dentro da resposta, e isso se acumula.
2. **Ferramentas de terceiros discordam muito.** Uma comparação controlada conectou o mesmo site a sete rastreadores de citações de IA durante os mesmos 15 dias e obteve sete números diferentes, de 38 a 312, uma variação de 8,2× ([relatório completo](https://kenimoto.dev/blog/seven-ai-citation-trackers-seven-different-numbers) (em inglês)). A divergência é um problema de definição, não uma falha dos fornecedores: as ferramentas diferem sobre o que conta como citação (fonte vinculada vs. qualquer menção de marca), quais LLMs amostram, com que frequência amostram e em quais idiomas.

A regra prática que se segue: **escreva sua definição de "citação" em uma frase antes de adquirir ou criar qualquer rastreador.** Se você se importa com tráfego de atribuição, conte apenas citações vinculadas. Se se importa com presença de marca, conte menções. Os números não são comparáveis entre definições.

## As Três Métricas Centrais

Indicadores macro como SOV (Share of Voice) e SOM (Share of Model) indicam se sua presença geral em IA se moveu, mas não dizem o que fazer a seguir. Para um ciclo de melhoria, decomponha em três métricas:

| Métrica | O que mede | Unidade | Cadência |
|---|---|---|---|
| Taxa de Citação | Com que frequência a IA menciona você em um conjunto fixo de prompts | % | Semanal |
| Densidade de Menção de Marca | Com que profundidade a IA fala sobre você quando o faz | menções por 1k palavras | Mensal |
| Conversão de Tráfego por IA | O que uma visita referida por IA vale | % | Mensal |

Juntas, cobrem frequência, profundidade e valor: uma contagem de citações isolada confunde as três.

### 1. Taxa de Citação

Execute um conjunto fixo de 10 a 20 prompts nas plataformas de IA que importam para você e meça a proporção de execuções em que sua marca ou domínio aparece:

```
Taxa de Citação = mencionado (prompt × plataforma) / total de execuções × 100
```

10 prompts × 5 plataformas = 50 execuções; 12 menções = 24%.

O conjunto de prompts deve permanecer congelado. Respostas de LLMs são não determinísticas — o mesmo prompt produz respostas diferentes em dias diferentes, então uma verificação única é ruído. Acompanhe a tendência em um conjunto de prompts imutável por pelo menos 4 semanas antes de interpretar qualquer resultado.

### 2. Densidade de Menção de Marca

A Taxa de Citação é binária por execução: mencionado ou não. Mas as citações variam em profundidade: um "outras opções incluem X" de passagem vale menos do que um parágrafo explicando sua abordagem. A Densidade de Menção mede as ocorrências de termos de marca por 1.000 palavras do texto de resposta:

```python
def mention_density(answer_text: str, brand_terms: list[str]) -> float:
    total_words = len(answer_text.split())
    mentions = sum(answer_text.lower().count(t.lower()) for t in brand_terms)
    return mentions / total_words * 1000
```

Uma citação profunda frequentemente supera um monte de citações superficiais. A densidade é a forma de ver essa diferença.

### 3. Conversão de Tráfego por IA

No GA4, crie um grupo de canais (Admin → Channel Groups) com um regex de fonte de sessão:

```regex
chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com
```

Depois compare a taxa de conversão desse segmento com a da Busca Orgânica. Medições de campo consistentemente mostram que visitantes encaminhados por IA convertem em um múltiplo do orgânico: dados da indústria de 2026 reportam 8 a 12% vs. 2 a 3% do orgânico, e nosso próprio acompanhamento em sites de referência variou de 2 a 4× o orgânico ([configuração de mensuração](https://kenimoto.dev/blog/measure-ai-citations-llmo-kpi/) (em inglês)). O mecanismo: um usuário que pergunta a uma IA "o que devo usar para X" está mais adiantado no processo de decisão do que um usuário digitando palavras-chave no Google. A IA fez a pesquisa; o clique está mais próximo da decisão.

Ponto cego conhecido: usuários gratuitos do ChatGPT frequentemente não enviam referrer, então seus cliques aparecem como Direto. Seus números de IA no GA4 são um piso, não um teto.

## Três Camadas de Implementação

Comece pela camada que corresponde aos seus recursos; cada camada adiciona resolução.

### Camada 1: grupo de canais no GA4 (gratuito, 5 minutos)
O regex acima. Mede apenas cliques (a ponta do iceberg), mas é verificável e leva cinco minutos.

### Camada 2: o protocolo manual das cinco plataformas (gratuito, 30 minutos/mês)
Em um dia fixo a cada mês, execute seus 10 a 15 prompts congelados no ChatGPT, Perplexity, Gemini, Claude e Copilot. Registre por execução: mencionado (sim/não), contexto (recomendação / comparação / neutro / negativo), precisão e se uma URL foi fornecida. Calcule a Taxa de Citação. Manual e tedioso, e ainda assim o método mais confiável disponível, porque nenhuma ferramenta automatizada julga se uma menção foi uma recomendação ou uma rejeição.

### Camada 3: automatize com APIs (uma tarde, ~$1 a $8/mês)
O protocolo manual, em código:

```python
BRAND_TERMS = ["seu-site.com", "Sua Marca"]
CHECK_QUERIES = ["Melhores ferramentas para <sua categoria>", ...]  # conjunto congelado

def check(query: str, ask) -> dict:
    answer = ask(query)  # chamada à API OpenAI / Anthropic / Perplexity
    return {
        "query": query,
        "mentioned": any(t.lower() in answer.lower() for t in BRAND_TERMS),
        "density": mention_density(answer, BRAND_TERMS),
        "snippet": answer[:300],
    }
```

Execute semanalmente via cron, acrescente a uma série temporal em JSON ou CSV. Após 8 a 12 semanas, você pode atribuir movimento a intervenções específicas: "a taxa de citação passou de 12% para 28% após adicionar dados estruturados" é uma frase que a Camada 3 permite dizer.

## O Sinal de Crawler Que a Maioria dos Sites Ignora

Os logs de acesso do servidor já registram quais sistemas de IA visitam seu conteúdo: GPTBot, ClaudeBot, PerplexityBot e Google-Extended se identificam no User-Agent:

```bash
grep -E "GPTBot|ClaudeBot|PerplexityBot|Google-Extended" access.log \
  | awk '{print $7}' | sort | uniq -c | sort -rn
```

Páginas que nunca são rastreadas não podem ser citadas pelo índice ao vivo. A frequência de rastreamento é um indicador indireto, mas antecipado: indica quais conteúdos os sistemas de IA estão pulando antes que os dados de citação possam mostrar isso.

## O Ciclo de Melhoria

Mensuração sem ação é acúmulo de dados. Um ritmo sustentável:

- **Semanal (10 min):** verifique o canal de IA no GA4 e o delta da Taxa de Citação; sinalize os prompts que produziram citações incomumente profundas.
- **Mensal (30 min):** revise a tendência de Densidade de Menção e a Conversão de Tráfego por IA vs. orgânico; liste os prompts ainda com zero citações.
- **Trimestral (1 hora):** revisão completa: atualize o conjunto de consultas e verifique se as mudanças de conteúdo produziram movimento mensurável.

Priorize os prompts com zero citações. Elevar um prompt de 0% para 10% é quase sempre mais barato do que elevar um prompt de 30% para 40%, porque o zero geralmente tem uma causa estrutural — nenhuma página aborda aquela pergunta, ou a página que a aborda viola a [Clareza de Conhecimento](/pt/framework/knowledge-clarity/) ou os [Sinais de Recuperação](/pt/framework/retrieval-signals/).

## Relação com o LLMO Score

As métricas desta página medem *resultados*: se a IA realmente cita você. O [LLMOFramework Score](/pt/specifications/score-v01/) mede a *base*: se as superfícies legíveis por máquina do seu site estão implementadas. Verificações de base são instantâneas e determinísticas; métricas de resultado são lentas e ruidosas. Use ambas: a base para encontrar o que corrigir, os resultados para confirmar que as correções fizeram diferença.

## Checklist

- [ ] "Citação" está definida em uma frase antes de qualquer ferramenta ser adotada
- [ ] Um conjunto de 10 a 20 prompts está escrito e congelado
- [ ] O GA4 tem um grupo de canais de Busca por IA com o regex de referência
- [ ] A Taxa de Citação é acompanhada em cadência fixa (semanal ou mensal)
- [ ] A Densidade de Menção distingue citações profundas de menções passageiras
- [ ] A Conversão de Tráfego por IA é comparada ao orgânico, não analisada isoladamente
- [ ] Os logs de crawler são verificados para páginas que sistemas de IA nunca visitam
- [ ] Os prompts com zero citações guiam o backlog de conteúdo
