<p align="center">
  <img src="https://github.com/Codee-Hub/TestYouAI_Web/blob/main/TestTouAI/Logo.png" alt="logo" width="600"/>
</p>

## 🤖 Descrição

TestYouAI é uma aplicação web que permite gerar testes personalizados usando Inteligência Artificial(GPT - OPEN AI).  
O front-end foi desenvolvido com **Next.js**, **React** e **Tailwind CSS**, oferecendo uma interface interativa e responsiva.  

Os usuários podem:

- Acessar testes básicos sem autenticação.
- Criar e responder testes completos após realizar login.
- Visualizar testes já respondidos, com feedback imediato sobre as respostas corretas e justificativas.

A aplicação consome uma **API RESTful** robusta, garantindo que todos os testes e dados do usuário sejam persistidos de forma segura e organizada.

**URL da API:** [TestYouAI API RESTful](https://github.com/Codee-Hub/TestYouAI_APIRestful)

---

## 🛠️ Tecnologias Utilizadas

* Next.js (React)
* TypeScript
* TailwindCSS
* Axios
* React-Toastify
* JWT para autenticação
* Tabler Icons

## ⚡ Scripts do Projeto

```bash
# Iniciar ambiente de desenvolvimento
npm run dev

```

## 📂 Estrutura de Páginas

- **Página de Autenticação 🔐**: Login e cadastro de usuários.
- **Página Home 🏠**: Acessível a todos, exibe testes disponíveis.
- **Página do Usuário 👤**: Necessita autenticação, mostra testes do usuário e histórico.
- **Página de Teste 📝**: Exibe o teste gerado com perguntas e opções, permite responder e corrigir.

## ✨ Funcionalidades

- Gerar testes com tema, nível e número de questões.
- Responder testes e visualizar resultados.
- Salvar testes respondidos para usuários autenticados.
- Suporte a usuários não autenticados (teste local, sem salvar).
- Interface **responsiva e moderna** com TailwindCSS.

## 🔗 API Consumida

A aplicação front-end consome uma **API RESTful** desenvolvida com **Spring Boot**, que inclui:

- **Integração com Spring AI**: utilização do **ChatGPT da OpenAI** para geração dinâmica de questões e respostas via json.
- **Autenticação** via **JWT** e **OAuth2**, usando chave pública e privada.
- **Segurança** com Spring Security, incluindo roles e proteção de endpoints.
- **Endpoints de usuário**: criação de usuários, login, e gerenciamento de testes.
- **Endpoints de testes**: criar, listar e responder testes.
- **Documentação** com Swagger (springdoc-openapi).
- **DTOs e Mappers** para transformação de dados entre entidades e modelos de API.
- **Banco de dados**: suporte a PostgreSQL.

> Todas as requisições autenticadas devem enviar o token JWT no header `Authorization: Bearer <token>`.

**URL da API:** [TestYouAI API RESTful](https://github.com/Codee-Hub/TestYouAI_APIRestful)

---

## 🤝 Como Contribuir

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Crie uma branch para sua feature: `git checkout -b minha-feature`
4. Faça as alterações e commit: `git commit -m 'Descrição da feature'`
5. Envie para o repositório: `git push origin minha-feature`
6. Abra um Pull Request.

---

## 📸 Capturas de Tela

### **Página de Autenticação 🔐**

![Página de Autenticação](https://github.com/Codee-Hub/TestYouAI_Web/blob/main/TestTouAI/login.png)

### **Página Home 🏠**

![Página Home](https://github.com/Codee-Hub/TestYouAI_Web/blob/main/TestTouAI/home.png)

### **Página do Usuário 👤**

![Página do Usuário](https://github.com/Codee-Hub/TestYouAI_Web/blob/main/TestTouAI/userpage.png)

### **Página de Teste 📝**

![Página de Teste](https://github.com/Codee-Hub/TestYouAI_Web/blob/main/TestTouAI/testpage1.png)
![Página de Teste](https://github.com/Codee-Hub/TestYouAI_Web/blob/main/TestTouAI/testpage2.png)

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License**.  
Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---
## 📬Contato

Desenvolvido por Cauã Farias 💻
Email: [cauafariasdev@gmail.com](mailto:cauafariasdev@gmail.com)
