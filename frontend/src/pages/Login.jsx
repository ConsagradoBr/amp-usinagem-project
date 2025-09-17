// Tela de login 
import React, { useState } from "react";
import { login } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, senha);
    setMensagem(result.message || result.error);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-orange-100 to-orange-200">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition"
          >
            Entrar
          </button>
        </form>
        {mensagem && (
          <p className="text-center mt-4 text-gray-700">{mensagem}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
