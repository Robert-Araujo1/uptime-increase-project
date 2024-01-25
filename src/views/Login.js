import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    navigate("/home");
  }
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center flex-column page-background">
      <h4 className="mb-3 text-primary-emphasis">Uptime Increase Project</h4>
      <div className="card">
        <div className="card-body">
          <form method="POST" className="login-validation" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label fw-light">E-mail</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="uptimeincreaseproject@domain.com"
                required={true}
                autoFocus={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label fw-light">Senha</label>
              <input type="password" className="form-control" required={true} placeholder="******" />
            </div>
            <div className="form-group mt-4 d-flex justify-content-center flex-column align-items-center">
              <button type="submit" className="btn btn-outline-primary w-50">
                Entrar
              </button>
              <a href="/resetpassword" className="link-underline-light pt-4">
                Esqueceu a senha?
              </a>
              <a href="/signup" className="link-underline-light pt-2">
                Registre-se
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
