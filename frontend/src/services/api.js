// Comunicação com API 
const API_URL = "http://127.0.0.1:5000";

export async function login(email, senha) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  return response.json();
}

export async function register(nome, email, senha) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });
  return response.json();
}

export async function listarUsuarios() {
  const response = await fetch(`${API_URL}/usuarios`);
  return response.json();
}
