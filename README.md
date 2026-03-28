<div align="center">

# 🤍 readlike

**A extensão que curte o que você realmente leu.**  
Scrolla no X. Para num post. Ela curte. Simples assim.

[![Opera](https://img.shields.io/badge/Opera-Extension-FF1B2D?style=for-the-badge&logo=opera&logoColor=white)](https://addons.opera.com)
[![Licença MIT](https://img.shields.io/badge/Licença-MIT-1d9bf0?style=for-the-badge)](LICENSE)
[![Feito com Claude](https://img.shields.io/badge/Feito%20com-Claude%20AI-a855f7?style=for-the-badge)](https://claude.ai)

<br/>

![readlike demo](https://raw.githubusercontent.com/WilliamP2P/readlike/main/assets/preview.png)

</div>

---

## ✨ O que faz

O algoritmo do X é simples: **o que você dá, recebe de volta.** (Lá ele)

O problema é que a gente lê um monte de post, acha interessante, mas esquece de curtir. O `readlike` resolve isso de forma inteligente:

- 👀 **Detecta quando você para** num post por 3-5 segundos
- ❤️ **Curte automaticamente** — só o que você realmente leu
- ⚡ **Ignora o scroll rápido** — rolou rápido, não curte
- 🔇 **Silencioso** — age em segundo plano, sem notificações
- ⚙️ **Ajustável** — você define o tempo mínimo de leitura (2s a 8s)

---

## 🚀 Instalação

> A extensão ainda não está na Opera Store. Instale manualmente em 3 passos:

**1. Baixe o zip**

Vá em [Releases](https://github.com/WilliamP2P/readlike/releases) e baixe o arquivo `readlike.zip`

**2. Extraia a pasta**

Descompacte o `.zip` em qualquer lugar no seu computador

**3. Carregue no Opera**

```
opera://extensions
```

Ative o **Modo de desenvolvedor** (canto superior direito) → clique em **Carregar sem compactação** → selecione a pasta extraída

✅ Pronto. O ícone ❤️ vai aparecer na barra do navegador.

---

## ⚙️ Como usar

Após instalar, é só usar o X normalmente.

Clique no ícone ❤️ na barra para:

| Opção | Descrição |
|---|---|
| Toggle on/off | Ativa ou pausa a extensão |
| Slider de tempo | Ajusta de 2s (rápido) a 8s (devagar) |

---

## 🧠 Como funciona por dentro

A extensão usa a [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) para monitorar quais posts estão visíveis na tela.

```
Post entra na tela (60%+ visível)
        ↓
Timer começa a contar
        ↓
Você rolou rápido?  →  Timer cancela. Não curte.
        ↓
Ficou o tempo definido?  →  Curte silenciosamente ✓
```

- Posts já curtidos são ignorados
- Funciona com feed infinito (detecta posts novos automaticamente)
- Delay humanizado antes de curtir (evita parecer automação)

---

## 📁 Estrutura

```
readlike/
├── manifest.json      # Configuração da extensão
├── content.js         # Lógica principal (observer + curtir)
├── popup.html         # Interface do popup
├── popup.js           # Lógica do popup
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🤝 Contribuindo

PRs são bem-vindos! Se quiser adicionar suporte a outras plataformas (Instagram, LinkedIn...) abre uma issue.

---

## 📄 Licença

MIT — use, modifique e distribua à vontade.

---

<div align="center">

Feito por [@WilliamP2P](https://x.com/WilliamP2P) com ajuda do [Claude](https://claude.ai)

*Se curtiu o projeto, deixa uma ⭐ no repo — o algoritmo do GitHub também é retributivo* 😄

</div>
