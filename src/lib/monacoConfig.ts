/**
 * Monaco Editor Configuration
 * Handles Monaco worker setup and error handling
 */

export function configureMonaco() {
  if (typeof window === 'undefined') return;

  // Suppress Monaco worker errors
  window.addEventListener('unhandledrejection', (event) => {
    // Check if it's a Monaco-related error
    if (
      event.reason &&
      (event.reason.toString().includes('monaco') ||
        event.reason.toString().includes('worker'))
    ) {
      // Prevent the error from showing in console
      event.preventDefault();
      console.warn('Monaco worker initialization handled:', event.reason);
    }
  });

  // Configure Monaco environment
  if (typeof window !== 'undefined') {
    (window as any).MonacoEnvironment = {
      getWorkerUrl: function (_moduleId: string, label: string) {
        if (label === 'json') {
          return '_next/static/chunks/json.worker.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return '_next/static/chunks/css.worker.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return '_next/static/chunks/html.worker.js';
        }
        if (label === 'typescript' || label === 'javascript') {
          return '_next/static/chunks/ts.worker.js';
        }
        return '_next/static/chunks/editor.worker.js';
      },
    };
  }
}
