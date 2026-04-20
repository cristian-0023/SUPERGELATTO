import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al registrarse.');
        setLoading(false);
        return;
      }

      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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

      {/* Register card */}
      <div className="login-page__container">
        <div className="login-card">
          {/* Brand */}
          <div className="login-brand">
            <div className="login-brand__icon-row">
              <span className="login-brand__icon">🍦</span>
              <h1 className="login-brand__name">Super Gelatto</h1>
            </div>
            <h2 className="login-brand__welcome">¡Únete!</h2>
            <p className="login-brand__subtitle">Crea tu cuenta y disfruta del sabor.</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          {success && (
            <div className="login-success">{success}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form__field">
              <span className="login-form__field-icon material-symbols-outlined">person</span>
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                className="login-form__input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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

            <div className="login-form__field">
              <span className="login-form__field-icon material-symbols-outlined">lock</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                className="login-form__input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={`login-form__submit ${loading ? 'login-form__submit--loading' : ''}`}
              disabled={loading}
            >
              <span className="login-form__submit-shimmer"></span>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="login-footer__link">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
