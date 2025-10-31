// src/pages/Unauthorized.tsx
import { useNavigate } from 'react-router';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🚫 Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <button onClick={() => navigate('/dashboard')}>
        Volver al Dashboard
      </button>
    </div>
  );
}

export default Unauthorized;