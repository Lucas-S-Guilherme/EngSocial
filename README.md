


# 📢 Projeto Educativo de Conscientização sobre Engenharia Social

⚠️ ATENÇÃO: Este projeto tem fins exclusivamente educacionais e demonstra como ataques de engenharia social podem ser realizados. Nunca use essas técnicas de forma maliciosa.

## 📌 Descrição

Um site fictício que simula um portal de login do FGTS (Caixa Econômica Federal), criado para conscientizar sobre os perigos de phishing e engenharia social.

    Armazena dados inseridos em um arquivo dados.json (apenas para demonstração).

    Mostra um alerta de segurança após o "login", explicando os riscos.

    100% educativo – sem coleta real de dados sensíveis.

## 🚀 Como Executar

### Pré-requisitos

    Node.js (v18+)

    npm ou yarn

### Passo a Passo

1. Clone o repositório
git clone https://github.com/Lucas-S-Guilherme/EngSocial.git
cd EngSocial

2. Instale as dependências
bash
npm install

3. Configure o ambiente (opcional)
Crie um arquivo .env na raiz:
env

PORT=3000
DB_FILE=./dados.json

4. Inicie o servidor
bash

    node server.js

5. Acesse no navegador (localmente)
    → http://localhost:3000

## 🔍 Como Visualizar os Dados Coletados

Os dados são salvos em dados.json. Para visualizar:

### Localmente
bash
cat dados.json

ou abra o arquivo manualmente.

### No Render.com (se em produção)

Adicione uma rota temporária em server.js:
javascript

app.get('/view-data', (req, res) => {
    res.sendFile(path.join(__dirname, 'dados.json'));
});

Acesse: https://seu-app.onrender.com/view-data

Para visualizar um exemplo posto em produção:
https://caixa-fgts.onrender.com/admin/data?secret=senhaadmin

### ⚠️ Remova essa rota após o uso!
### 🛡️ Avisos de Segurança

    Nunca use isso em um ambiente real sem autorização.

    Dados são armazenados apenas para fins educacionais e devem ser deletados periodicamente.

    Adicione um aviso claro de que é uma demonstração.



<p align="center"> <img src="https://img.shields.io/badge/Educational-Purple?style=for-the-badge" alt="Educational"> <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge" alt="Node.js"> <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License"> </p>

### 🌟 Ajude a conscientizar sobre segurança digital!

### 📌 Lembre-se: segurança digital começa com educação! 🚨