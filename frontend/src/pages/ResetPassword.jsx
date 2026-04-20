import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`/api/reset-password/${token}`);
        const data = await res.json();

        if (data.valid) {
          setTokenValid(true);
        } else {
          setError(data.message || 'Enlace inválido o expirado.');
          setTokenValid(false);
        }
      } catch (err) {
        setError('Error de conexión con el servidor.');
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.password || !formData.confirmPassword) {
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
      const res = await fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al restablecer la contraseña.');
        setLoading(false);
        return;
      }

      setSuccess(data.message);
      setLoading(false);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Error de conexión con el servidor.');
      setLoading(false);
    }
  };

  // Loading state while validating token
  if (validating) {
    return (
      <div className="login-page">
        <img
          src="/images/Gemini_Generated_Image_qcbtmiqcbtmiqcbt.png"
          alt="Helado artesanal"
          className="login-page__bg"
        />
        <div className="login-page__overlay"></div>
        <div className="login-page__container">
          <div className="login-card">
            <div className="login-brand">
              <div className="login-brand__icon-row">
                <span className="login-brand__icon login-form__submit--loading" style={{ display: 'inline-block' }}>🍦</span>
                <h1 className="login-brand__name">Super Gelatto</h1>
              </div>
              <h2 className="login-brand__welcome">Validando...</h2>
              <p className="login-brand__subtitle">Verificando tu enlace de recuperación.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!tokenValid && !success) {
    return (
      <div className="login-page">
        <img
          src="/images/Gemini_Generated_Image_qcbtmiqcbtmiqcbt.png"
          alt="Helado artesanal"
          className="login-page__bg"
        />
        <div className="login-page__overlay"></div>
        <div className="login-page__container">
          <div className="login-card">
            <div className="login-brand">
              <div className="login-brand__icon-row">
                <span className="login-brand__icon">❌</span>
                <h1 className="login-brand__name">Super Gelatto</h1>
              </div>
              <h2 className="login-brand__welcome">Enlace Inválido</h2>
              <p className="login-brand__subtitle">
                {error || 'Este enlace ha expirado o ya fue utilizado.'}
              </p>
            </div>

            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <button className="login-form__submit">
                Solicitar nuevo enlace
              </button>
            </Link>

            <div className="login-footer">
              <p>
                <Link to="/login" className="login-footer__link">
                  ← Volver al inicio de sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Valid token — show reset form
  return (
    <div className="login-page">
      <img
        src="/images/Gemini_Generated_Image_qcbtmiqcbtmiqcbt.png"
        alt="Helado artesanal"
        className="login-page__bg"
      />
      <div className="login-page__overlay"></div>

      <div className="login-page__container">
        <div className="login-card">
          <div className="login-brand">
            <div className="login-brand__icon-row">
              <span className="login-brand__icon">{success ? '🎉' : '🔑'}</span>
              <h1 className="login-brand__name">Super Gelatto</h1>
            </div>
            <h2 className="login-brand__welcome">
              {success ? '¡Completado!' : 'Nueva Contraseña'}
            </h2>
            <p className="login-brand__subtitle">
              {success
                ? 'Tu contraseña ha sido actualizada con éxito.'
                : 'Ingresa tu nueva clave de acceso.'}
            </p>
          </div>

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          {!success && (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form__field">
                <span className="login-form__field-icon material-symbols-outlined">lock</span>
                <input
                  type="password"
                  name="password"
                  className="login-form__input"
                  placeholder="Nueva contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login-form__field">
                <span className="login-form__field-icon material-symbols-outlined">lock</span>
                <input
                  type="password"
                  name="confirmPassword"
                  className="login-form__input"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`login-form__submit ${loading ? 'login-form__submit--loading' : ''}`}
                disabled={loading}
              >
                <span className="login-form__submit-shimmer"></span>
                {loading ? 'Procesando...' : 'Cambiar contraseña'}
              </button>
            </form>
          )}

          <div className="login-footer">
            <p>
              <Link to="/login" className="login-footer__link">
                ← Volver al inicio de sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
