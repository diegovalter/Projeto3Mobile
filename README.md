# 📱 Mobile Automation - Swag Labs (WDIO v9)

Este projeto implementa uma automação de testes End-to-End (E2E) para o aplicativo nativo **Swag Labs** (Android). Utilizando o **WebdriverIO v9** e **Appium**, o foco principal é validar a jornada de compra completa do usuário, garantindo a integridade do funil de vendas em dispositivos móveis.

---

## 📋 Jornada de Teste (E2E)

A suíte de testes cobre os seguintes marcos críticos:

1. **Autenticação:** Login com credenciais válidas e validação de estado inicial.
2. **Catálogo de Produtos:** Navegação na lista de itens e seleção detalhada de produto (Sauce Labs Backpack).
3. **Manipulação de Gestos:** Uso de **W3C Actions** para realizar scroll dinâmico na tela, permitindo acessar elementos que não estão visíveis no *viewport* inicial.
4. **Checkout Progressivo:** Inserção de dados de entrega (First Name, Last Name, Zip Code) e validação do resumo financeiro (`Total: $32.39`).
5. **Confirmação de Pedido:** Validação da mensagem de sucesso: *"THANK YOU FOR YOUR ORDER"*.

---

## 🛠️ Tecnologias e Técnicas Avançadas

* **WebdriverIO v9** — A versão mais recente do framework, utilizando capacidades assíncronas nativas.
* **Appium & UiAutomator2** — Driver especializado para interação com elementos nativos do ecossistema Android.
* **W3C Pointer Actions** — Implementação manual de gestos de toque para garantir compatibilidade e fluidez no scroll.
* **Seletores Híbridos:** Combinação de `Accessibility ID` (boas práticas de acessibilidade) e `UiSelector` (estratégia nativa do Android).
* **Mocha Framework** — Estruturação de testes em blocos `describe` e `it` para relatórios claros e organizados.

---

## 🏗️ Estrutura do Projeto

```text
├── tests/
│   └── specs/
│       └── compra.spec.js     # Fluxo completo de automação mobile
├── wdio.conf.js               # Configuração do Runner e Capabilities Android
├── package.json               # Gerenciamento de dependências (WDIO v9)
└── .gitignore                 # Exclusão de logs e node_modules

```

---

## 🚀 Como Executar

1. **Pré-requisitos:**
* Appium Server instalado e rodando.
* Emulador Android (Android 13.0) configurado.
* APK do Swag Labs instalado no dispositivo.


2. **Instalação:**
```bash
npm install

```


3. **Execução:**
```bash
npm run wdio

```



---

## 💡 Diferenciais Técnicos

* **Resiliência:** Uso de `instance(1)` no `UiSelector` para diferenciar elementos que compartilham o mesmo texto na árvore do DOM mobile.
* **Performance:** Configuração de `maxInstances: 10` no `wdio.conf.js`, preparada para execução paralela em fazendas de dispositivos.
* **Manutenibilidade:** O código utiliza esperas implícitas e explícitas (`expect().toBeDisplayed()`) para lidar com o tempo de renderização de atividades nativas.
