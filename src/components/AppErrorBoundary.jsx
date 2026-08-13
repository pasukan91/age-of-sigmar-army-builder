import { Component } from "react";

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Storm Forge ha contenido un error de interfaz.", error, info);
  }

  handleRestart = () => {
    window.location.assign("/");
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <main className="aos-fatal-error" role="alert">
        <div className="aos-fatal-error__card">
          <p className="aos-kicker">Storm Forge</p>
          <h1>No hemos podido mostrar esta pantalla</h1>
          <p>
            Tus listas siguen guardadas en este dispositivo. Vuelve al inicio y
            prueba de nuevo; el error ha quedado aislado para evitar una pantalla en blanco.
          </p>
          <button type="button" onClick={this.handleRestart}>
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }
}

export default AppErrorBoundary;
