const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de login - agora salva dados e mostra o perigo
app.post('/login', (req, res) => {
    const { cpf, senha } = req.body;
    const userIp = req.ip || req.connection.remoteAddress;
    
    // Criar objeto com dados sensíveis (SIMULAÇÃO DE RISCO)
    const loginData = {
        cpf,
        senha,
        ip: userIp,
        data: new Date().toISOString(),
        alerta: "ESTES DADOS FORAM ARMAZENADOS - ISSO É UM RISCO DE SEGURANÇA!"
    };

    // Salvar no arquivo (simulando um ataque real)
    fs.readFile('dados.json', (err, data) => {
        let logins = [];
        
        if (!err && data.length > 0) {
            try {
                logins = JSON.parse(data);
            } catch (e) {
                console.error('Erro ao ler dados existentes:', e);
            }
        }
        
        logins.push(loginData);
        
        fs.writeFile('dados.json', JSON.stringify(logins, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar dados:', err);
                return res.status(500).send('Erro no servidor');
            }
            
            // Página de alerta mostrando o perigo
            const securityPage = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>ALERTA DE SEGURANÇA</title>
                    <link rel="stylesheet" href="/style.css">
                    <style>
                        .dados-expostos {
                            background-color: #ffebee;
                            border: 2px dashed #f44336;
                            padding: 20px;
                            margin: 20px 0;
                            font-family: monospace;
                        }
                        .risco {
                            color: #f44336;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="security-alert">
                        <h1>⚠️ SEUS DADOS FORAM ARMAZENADOS!</h1>
                        <p class="risco">ISSO SIMULA O QUE UM CRIMINOSO FARIA EM UM ATAQUE REAL!</p>
                        
                        <div class="dados-expostos">
                            <h3>Veja o que foi armazenado:</h3>
                            <pre>${JSON.stringify(loginData, null, 2)}</pre>
                        </div>
                        
                        <h2>📌 Isso poderia levar a:</h2>
                        <ul>
                            <li>Roubo de identidade</li>
                            <li>Acesso às suas contas bancárias</li>
                            <li>Empréstimos em seu nome</li>
                            <li>Fraudes financeiras</li>
                        </ul>
                        
                        <div class="security-tips">
                            <h3>🔒 Como se proteger:</h3>
                            <ol>
                                <li>Sempre verifique o URL do site (https:// e cadeado)</li>
                                <li>Nunca repita senhas entre serviços</li>
                                <li>Desconfie de sites que pedem muitos dados pessoais</li>
                                <li>Ative a autenticação em dois fatores</li>
                            </ol>
                        </div>
                        
                        <p><a href="/">Voltar e tentar novamente</a> (apenas para fins educativos)</p>
                    </div>
                </body>
                </html>
            `;
            
            res.send(securityPage);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor educativo rodando em http://localhost:${PORT}`);
    console.log('⚠️ Este projeto demonstra os riscos de engenharia social');
});