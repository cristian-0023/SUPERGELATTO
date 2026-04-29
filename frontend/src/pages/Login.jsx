import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import '../styles/Auth.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      const email = payload.email;
      const name = payload.name || payload.given_name || 'Usuario de Google';
      const picture = payload.picture;

      // CLAVE INTERNA PARA USUARIOS DE GOOGLE (para el backend que no podemos tocar)
      const GOOGLE_SECRET_PWD = `GOOGLE_USER_${email}_SECURE_KEY`;

      // 1. Intentar iniciar sesión (por si ya tiene cuenta de Google vinculada)
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: GOOGLE_SECRET_PWD }),
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        onLogin({ ...loginData.user, picture });
        navigate('/');
        return;
      }

      // 2. Si no tiene cuenta, registrarlo automáticamente
      const registerRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          password: GOOGLE_SECRET_PWD, 
          confirmPassword: GOOGLE_SECRET_PWD 
        }),
      });

      if (registerRes.ok) {
        // Logear ahora que ya existe
        const finalLoginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: GOOGLE_SECRET_PWD }),
        });
        const finalData = await finalLoginRes.json();
        onLogin({ ...finalData.user, picture });
        navigate('/');
      } else {
        const errorData = await registerRes.json();
        // Si el email ya existe con OTRA contraseña (registro manual previo)
        if (registerRes.status === 409) {
          setError('Este email ya está registrado con una contraseña manual. Por favor, entra con tu correo y contraseña.');
        } else {
          setError('Error al vincular tu cuenta de Google.');
        }
        setLoading(false);
      }
    } catch (e) {
      console.error('Error in Google Auth flow', e);
      setError('Error de conexión al procesar Google login.');
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Error al iniciar sesión con Google.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Error al iniciar sesión.');
        setLoading(false);
        return;
      }

      onLogin(data.user);
      navigate('/');
    } catch (err) {
      setError('Error de conexión con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Full-screen background image */}
      <img
        src="/images/Gemini_Generated_Image_qcbtmiqcbtmiqcbt.png"
        alt="Helado artesanal"
        className="login-page__bg"
      />
      <div className="login-page__overlay"></div>

      {/* Login card container */}
      <div className="login-page__container">
        <div className="login-card">
          {/* Brand */}
          <div className="login-brand">
            <div className="login-brand__logo-container">
              <img 
                src="/images/Gemini_Generated_Image_eq9r4req9r4req9r (3).png" 
                alt="super gelatto" 
                className="login-brand__logo"
              />
            </div>
            <h2 className="login-brand__welcome">¡Hola de nuevo!</h2>
            <p className="login-brand__subtitle">Ingresa a tu taller del sabor.</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form__field">
              <span className="login-form__field-icon material-symbols-outlined">mail</span>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="login-form__input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="login-form__field">
              <span className="login-form__field-icon material-symbols-outlined">lock</span>
              <input
                type="password"
                name="password"
                placeholder="Contraseña (mín. 6 caracteres)"
                className="login-form__input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="login-form__forgot">
              <Link to="/forgot-password" className="login-form__forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              className={`login-form__submit ${loading ? 'login-form__submit--loading' : ''}`}
              disabled={loading}
            >
              <span className="login-form__submit-shimmer"></span>
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider__line"></div>
            <span className="login-divider__text">O continúa con</span>
            <div className="login-divider__line"></div>
          </div>

          {/* Google */}
          <div className="login-google">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              shape="pill"
              width={300}
              text="signin_with"
            />
          </div>

          {/* Register */}
          <div className="login-footer">
            <p>
              ¿Aún no tienes cuenta?{' '}
              <Link to="/register" className="login-footer__link">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
