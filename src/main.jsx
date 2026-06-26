import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

window.addEventListener('error', function(event) {
  const message = event.message || '';
  if (
    message === "Script error." || 
    message === "Script error" || 
    !event.filename || 
    (typeof message === 'string' && (message.includes("Script error") || message.includes("cross-origin")))
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
    return true;
  }
}, true);

window.onerror = function(message, source, lineno, colno, error) {
  // Swallow cross-origin script errors which are outside of our control (e.g. extension, platform scripts)
  if (
    message === "Script error." || 
    message === "Script error" || 
    !source || 
    (typeof message === 'string' && (message.includes("Script error") || message.includes("cross-origin")))
  ) {
    return true; // Swallows error propagation
  }
  console.error("GLOBAL ERROR HANDLER:", message, source, lineno, colno, error);
};

window.addEventListener('unhandledrejection', function(event) {
  if (event.reason && (event.reason.message === "Script error." || (typeof event.reason.message === 'string' && event.reason.message.includes("Script error")))) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}, true);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
