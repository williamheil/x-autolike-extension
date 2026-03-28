<div align="center">

# 🤍 readlike

**A extensão que curte o que você realmente leu.**  
Scrolla no X. Para num post. Ela curte. Simples assim.

[![Chrome](https://img.shields.io/badge/Chrome-Compatível-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](#-google-chrome)
[![Opera](https://img.shields.io/badge/Opera-Compatível-FF1B2D?style=for-the-badge&logo=opera&logoColor=white)](#-opera)
[![Edge](https://img.shields.io/badge/Edge-Compatível-0078D4?style=for-the-badge&logo=microsoftedge&logoColor=white)](#-microsoft-edge)
[![Brave](https://img.shields.io/badge/Brave-Compatível-FB542B?style=for-the-badge&logo=brave&logoColor=white)](#-brave)
[![Licença MIT](https://img.shields.io/badge/Licença-MIT-1d9bf0?style=for-the-badge)](LICENSE)

<br/>

</div>

---

## ✨ O que faz

O algoritmo do X é simples: **o que você dá, recebe de volta.** (Lá ele kk)

O problema é que a gente lê um monte de post, acha interessante, mas esquece de curtir. O `readlike` resolve isso de forma inteligente:

- 👀 **Detecta quando você para** num post por 3-5 segundos
- ❤️ **Curte automaticamente** — só o que você realmente leu
- ⚡ **Ignora o scroll rápido** — rolou rápido, não curte
- 🔇 **Silencioso** — age em segundo plano, sem notificações
- ⚙️ **Ajustável** — você define o tempo mínimo de leitura (2s a 8s)

---

## 🚀 Instalação

> Baixe o zip em [Releases](https://github.com/WilliamP2P/readlike/releases) e siga as instruções do seu navegador abaixo.

---

### 🔵 Google Chrome

1. Baixe e **extraia** o `readlike.zip`
2. Acesse `chrome://extensions` na barra de endereço
3. Ative o **Modo do desenvolvedor** (toggle no canto superior direito)
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta extraída
6. ✅ Pronto — o ícone ❤️ aparece na barra

---

### 🔴 Opera

1. Baixe e **extraia** o `readlike.zip`
2. Acesse `opera://extensions` na barra de endereço
3. Ative o **Modo de desenvolvedor** (toggle no canto superior direito)
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta extraída
6. ✅ Pronto — o ícone ❤️ aparece na barra

---

### 🔵 Microsoft Edge

1. Baixe e **extraia** o `readlike.zip`
2. Acesse `edge://extensions` na barra de endereço
3. Ative o **Modo de desenvolvedor** (toggle no menu lateral esquerdo)
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta extraída
6. ✅ Pronto — o ícone ❤️ aparece na barra

---

### 🟠 Brave

1. Baixe e **extraia** o `readlike.zip`
2. Acesse `brave://extensions` na barra de endereço
3. Ative o **Modo de desenvolvedor** (toggle no canto superior direito)
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta extraída
6. ✅ Pronto — o ícone ❤️ aparece na barra

---

> ⚠️ **Firefox não é suportado** — usa um sistema de extensões diferente (Manifest V2).

---

## ⚙️ Como usar

Após instalar, é só usar o X normalmente. Clique no ícone ❤️ na barra para ajustar:

| Opção | Descrição |
|---|---|
| Toggle on/off | Ativa ou pausa a extensão |
| Slider de tempo | Ajusta de 2s (rápido) a 8s (devagar) |

---

## 🧠 Como funciona por dentro

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
- Delay humanizado antes de curtir

---

## 📁 Estrutura

```
readlike/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🤝 Contribuindo

PRs são bem-vindos! Se quiser adicionar suporte a outras plataformas abre uma issue.

---

## 📄 Licença

MIT — use, modifique e distribua à vontade.

---

<div align="center">

Feito por [@WilliamP2P](https://x.com/WilliamP2P) com ajuda do [Claude](https://claude.ai)

*Se curtiu o projeto, deixa uma ⭐ no repo — o algoritmo do GitHub também é retributivo* 😄

</div>
