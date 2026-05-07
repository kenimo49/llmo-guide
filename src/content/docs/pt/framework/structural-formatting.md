---
title: "2. Formatação estrutural"
description: "Formatação estrutural é a prática de organizar conteúdo usando formatos legíveis por máquina — JSON-LD, HTML semântico, Markdown, llms.txt — para que sistemas de IA possam processar e extrair informações com eficiência."
---

## O Que É

Formatação estrutural é a prática de organizar seu conteúdo usando formatos legíveis por máquina e marcação semântica para que sistemas de IA possam processar, categorizar e extrair informações com eficiência.

## Por Que É Importante

Sistemas de IA não "leem" páginas como humanos. Eles processam dados estruturados de forma muito mais confiável do que texto livre. Uma estrutura adequada significa que seu conteúdo tem maior probabilidade de ser interpretado e citado corretamente, em vez de ser mal compreendido ou ignorado.

## Como Implementar

### 1. Use HTML Semântico e Markdown
Estruture o conteúdo com títulos adequados (h1-h6), listas, tabelas e elementos semânticos. Evite usar formatação visual (negrito, tamanho de fonte) como substituto para hierarquia estrutural.

### 2. Implemente Dados Estruturados JSON-LD
Adicione marcação Schema.org às suas páginas. No mínimo, inclua:
- `Organization` ou `Person` para sua identidade
- `Article` ou `WebPage` para páginas de conteúdo
- `FAQPage` para conteúdo de perguntas e respostas

### 3. Forneça um Arquivo llms.txt
Crie um arquivo `/llms.txt` na raiz do seu domínio seguindo o [padrão llms.txt](https://llmstxt.org/). Isso fornece aos sistemas de IA um resumo conciso e amigável para máquina do seu site.

### 4. Organize o Conteúdo Hierarquicamente
Use uma arquitetura de informações clara: categorias amplas → tópicos específicos → conteúdo detalhado. Reflita isso na estrutura de URL e na hierarquia de títulos.

### 5. Use Tabelas para Dados Comparativos
Ao apresentar comparações, funcionalidades ou especificações, use tabelas HTML/Markdown adequadas em vez de descrições em prosa.

## Exemplos

**❌ Sem estrutura:**
> Oferecemos três planos. O plano básico custa R$50 e inclui 5 usuários. O plano pro custa R$125 e inclui 20 usuários. O plano enterprise tem preço personalizado com usuários ilimitados.

**✅ Estruturado:**

| Plano | Preço | Usuários |
|-------|-------|---------|
| Básico | R$50/mês | 5 |
| Pro | R$125/mês | 20 |
| Enterprise | Personalizado | Ilimitado |

## Checklist

- [ ] Páginas usam hierarquia adequada de títulos (h1 → h2 → h3)
- [ ] Dados estruturados JSON-LD estão presentes nas páginas principais
- [ ] Um arquivo llms.txt existe na raiz do domínio
- [ ] O conteúdo usa listas e tabelas onde apropriado
- [ ] A estrutura de URL reflete a hierarquia do conteúdo
