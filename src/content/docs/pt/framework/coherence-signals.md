---
title: "6. Sinais de coerência"
description: "Sinais de coerência garantem que o mesmo fato conte a mesma história em todas as superfícies que a IA lê — HTML, JSON-LD, Markdown, llms.txt. Inconsistências degradam a precisão das citações e corroem a confiança."
pubDate: 2026-05-08
---

## O Que São

> **Fronteira com a Formatação estrutural**: a *Formatação estrutural* pergunta "cada superfície está bem formada individualmente?" — JSON-LD válido, HTML semântico, schema com escopo. Os *Sinais de coerência* perguntam "as superfícies concordam entre si?" — o mesmo endereço no HTML e no Markdown, os mesmos números no `llms.txt` e no perfil da página inicial, nenhuma entidade `Organization` duplicada com campos conflitantes. Uma página pode passar na Formatação estrutural e ainda assim falhar na coerência: cada bloco é válido, mas, juntos, contam duas histórias.

Os sinais de coerência medem se o seu conteúdo conta **a mesma história em todas as superfícies que um agente de IA consegue ler**. Um site moderno otimizado para LLMO expõe fatos por muitos canais:

- Corpo da página HTML (visível para humanos + crawlers de IA)
- Dados estruturados JSON-LD
- llms.txt e llms-full.txt
- Endpoints /ai/*.md e URL.md (por exemplo, `/company.md`)
- Meta tags OG/Twitter
- Sitemap, robots.txt, declarações hreflang

Quando o mesmo fato (um número, um endereço, um catálogo de serviços, uma data de publicação) aparece de forma diferente em duas dessas superfícies, um sistema de IA que recorre a ambas fica confuso. O modelo pode escolher o valor que pesa mais, expor um número desatualizado ou se recusar a citar por completo, porque o conflito sinaliza baixa qualidade.

A coerência é a disciplina de LLMO que garante uma **fonte única de verdade** em todas as superfícies.

## Por Que São Importantes

A precisão das citações depende de **evidências convergentes**. Quando um modelo recupera seu conteúdo por vários caminhos e os valores concordam, a confiança aumenta e a citação chega ao usuário. Quando os valores divergem, surgem vários modos de falha:

- **Menor taxa de citação** — o modelo cede a uma fonte cujas evidências internas são consistentes.
- **Fato errado citado** — se a IA pega a variante mais antiga de `/ai/founder.md`, o número atualizado da sua página inicial nunca chega ao usuário.
- **Amplificação de alucinações** — quando as superfícies conflitam, o modelo tende mais a interpolar uma resposta "de compromisso" que não bate com nenhuma das duas.
- **Erosão de autoridade** — re-rankers de IA experientes (Perplexity, AI Overviews) comparam referências cruzadas; autorreferências conflitantes são lidas como baixa qualidade.

Uma autoauditoria de 2024 da [Propel-Lab](https://propel-lab.co.jp/) descobriu que o mesmo perfil de autor afirmava ao mesmo tempo **4 livros / 39.000+ PV no Qiita** (em `/ai/founder.md`, `llms-full.txt`) e **14 livros / 80.000+ PV no Qiita** (no componente de perfil da página inicial) — uma contradição ativa que vinha sendo servida a crawlers de IA havia meses.

## Como Implementar

### 1. Defina uma única fonte para cada fato

Para toda afirmação numérica ou factual, indique **um** arquivo como a fonte canônica. Todas as outras superfícies importam ou citam essa fonte.

| Fato | Fonte canônica | Consumidores |
|------|----------------|--------------|
| Quantidade de livros, estatísticas de PV | `src/data/profile.ts` | Componente de perfil, `/ai/founder.md`, `llms-full.txt`, JSON-LD |
| Catálogo de serviços | `src/data/services.ts` | `/products/`, JSON-LD `Service[]`, `/ai/services.md`, `llms.txt` |
| Endereço, data de fundação | `src/data/company.ts` | Rodapé, `/company.md`, JSON-LD `Organization`, `llms-full.txt` |
| Itens de FAQ | `src/lib/faq-schema.ts` | Componente de FAQ, JSON-LD `FAQPage`, `/faq.md` |

O padrão é: coleção de conteúdo ou módulo de dados tipado → templates e endpoints estáticos puxam ambos daí.

### 2. Gere as superfícies de IA a partir da mesma fonte do HTML

Não escreva `llms.txt` ou `/ai/*.md` à mão se o conteúdo deles já existe em dados tipados:

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— Público: ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

A visão HTML, o JSON-LD `Service[]` e `/products.md` têm todos origem em `services`. A divergência se torna estruturalmente impossível.

### 3. Trate a canonicalização de URL como uma questão de coerência

`https://www.example.com/` e `https://example.com/` são duas strings para um crawler que faz correspondência de texto. Escolha um host canônico e o aplique com rigor:

- `<link rel="canonical">` em todas as páginas
- `og:url`, JSON-LD `url`, entradas do sitemap — mesmo host
- Referências em `/ai/*.md`, `llms.txt` — mesmo host
- Links internos — relativos ou canônicos-absolutos, nunca o host alternativo

Um erro comum é esquecer dos arquivos `/ai/*.md` ao migrar de `www.` para o apex (ou vice-versa). O resto do site fica canônico e as superfícies em Markdown vazam silenciosamente o host errado para a IA.

### 4. Trate a política de barra final como uma questão de coerência

Se o seu host normaliza `/blog/post` → `/blog/post/` com um 301, todo link interno já deveria incluir a barra. Formas misturadas produzem:

- Desperdício de orçamento de rastreamento em redirecionamentos
- Sinais canônicos conflitantes durante a janela do redirecionamento
- hreflang quebrado (alguns declarados com barra, outros sem)

Escolha uma política no nível do framework (Astro `trailingSlash: 'always'` ou `'never'`) e faça grep no seu repositório para garantir que nenhum infrator permaneça.

### 5. Detecte divergências com verificações entre arquivos

Adicione um passo de CI que faça grep da mesma afirmação numérica ou textual entre as superfícies e verifique a igualdade:

```bash
# Falha se alguma fonte ainda tiver a quantidade antiga de livros
! grep -rn "4 books\|4 livros\|Kindle author: 4" public/ src/data/ src/content/
```

Mais simples ainda: um validador de JSON-LD que faz parse tanto do `<script>` inline quanto de qualquer arquivo `.jsonld` avulso e verifica se eles concordam nos valores de `@id` compartilhados.

### 6. O processo de release é uma superfície de coerência

Um número de versão é um fato no sentido de LLMO — uma afirmação sobre o seu site que uma IA pode citar. Se o `package.json` diz `1.2.0`, o `src/data/version.ts` diz `1.1.0`, a página de changelog diz `v1.2.0` em inglês mas `v1.1.0` em japonês, e a última tag do git é `v1.1.0`, o site está se contradizendo em cinco superfícies sobre o mesmo fato.

Isso não é teórico. O framework que você está lendo lançou exatamente essa divergência na v1.2.0; o [estudo de caso da autoauditoria](/pt/case-studies/llmo-framework-self-audit/) registra o que aconteceu.

O padrão que evita isso:

1. **Gere o máximo possível de superfícies de versão a partir de uma única fonte**. Um script de bump que atualiza `package.json` + um módulo de dados tipado + o changelog em Markdown de uma vez é infraestrutura obrigatória para qualquer framework que afirme a coerência como um valor.
2. **Torne a versão visível em tempo de execução, não só nos metadados**. Um rodapé que exibe `v{VERSION}` lendo do módulo de dados tipado transforma a divergência em tempo de build em retorno imediato para o usuário. Quem mantém o site e roda `npm run build` vê a discrepância em todas as páginas.
3. **Condicione o release a verificações cruzadas**. Um passo de CI que lê a versão do `package.json` e faz grep dela no `CHANGELOG.md`, no `src/data/version.ts` e na página de changelog deve sair com código diferente de zero se algum deles discordar.
4. **Rode uma revisão de segunda passada por IA somente leitura antes de criar a tag**. O custo são alguns centavos em tokens de API; o benefício é pegar a ironia antes que os usuários peguem.

O processo de release é a superfície de conteúdo do framework falando com a IA em tempo real. Trate-o assim.

### 7. Evite entidades JSON-LD duplicadas para o mesmo `@id`

A falha silenciosa mais comum: o layout emite um `Organization` com um endereço e um trecho específico de página emite outro `Organization` com endereço diferente. Os dois chegam ao HTML. O crawler faz parse de ambos. A pontuação de confiança da página cai.

Correção: atribua um `@id` a cada entidade no nível do framework (`https://example.com/#org`, `#founder`, `#website`) e referencie por `@id` em todos os outros lugares. Qualquer duplicata fica óbvia na revisão de código.

## Exemplos

**❌ Divergência entre superfícies:**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```typescript
// src/components/Profile.astro (renderizado na página inicial)
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD em /
{ "@type": "Person", "name": "Ken Imoto" /* sem números atuais */ }
```

Três superfícies, três histórias diferentes. Uma IA que cita `/ai/founder.md` reporta números desatualizados; uma IA que cita o HTML reporta os números atuais; o JSON-LD não ajuda a resolver o conflito.

**✅ Fonte única:**

```typescript
// src/data/profile.ts — canônico
export const profile = {
  highlights: [
    'Kindle author: 14 books',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- Componente de perfil -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

Um valor mora em um lugar. A visão HTML, o endpoint Markdown para IA e o JSON-LD evoluem juntos.

## Checklist

- [ ] Toda afirmação factual (números, endereços, datas, catálogos) tem exatamente um arquivo de fonte canônica
- [ ] Superfícies exclusivas de IA (`llms.txt`, `/ai/*.md`, endpoints URL.md) são geradas a partir dos mesmos dados do HTML, não mantidas à mão em paralelo
- [ ] O host canônico é consistente em `<link rel="canonical">`, `og:url`, JSON-LD, sitemap e superfícies Markdown
- [ ] A política de barra final é definida no nível do framework e refletida em todos os links internos
- [ ] Nenhum par de blocos JSON-LD descreve a mesma entidade com valores diferentes; as entidades usam `@id` estável para referências entre páginas
- [ ] A CI verifica divergências entre arquivos nas métricas-chave (quantidade de livros, estatísticas de PV, listas de serviços)
- [ ] Uma auditoria periódica de duas passadas (autorrevisão → revisão de IA de segunda opinião) pega divergências entre releases — veja [Auditoria LLMO: Revisão em Duas Passadas](/pt/guide/llmo-audit-two-pass-review/)
