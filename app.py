from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 🔧 Configuração do banco (troque SENHA pela sua senha real do postgres)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:*.Pikenos123@localhost:5432/usinagem_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# 🔧 Modelo da tabela
class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    criado_em = db.Column(db.DateTime, server_default=db.func.now())

# 🔧 Rota para teste
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Backend conectado com sucesso!"})

# 🔧 Rota de cadastro
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Verifica se email já existe
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email já cadastrado!"}), 400

    # Criptografa a senha
    hashed_password = bcrypt.generate_password_hash(data['senha']).decode('utf-8')
    
    novo_usuario = Usuario(
        nome=data['nome'],
        email=data['email'],
        senha=hashed_password
    )
    db.session.add(novo_usuario)
    db.session.commit()
    
    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

# 🔧 Rota de login (com bcrypt)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = Usuario.query.filter_by(email=data['email']).first()
    if usuario and bcrypt.check_password_hash(usuario.senha, data['senha']):
        return jsonify({"message": f"Bem-vindo, {usuario.nome}!"}), 200
    return jsonify({"error": "Credenciais inválidas"}), 401

# 🔧 Rota para listar usuários
@app.route('/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios = Usuario.query.all()
    resultado = []
    for u in usuarios:
        resultado.append({
            "id": u.id,
            "nome": u.nome,
            "email": u.email,
            "criado_em": u.criado_em
        })
    return jsonify(resultado), 200

if __name__ == '__main__':
    app.run(debug=True)
