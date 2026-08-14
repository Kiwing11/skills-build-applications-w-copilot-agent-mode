const codespaceName = process.env.CODESPACE_NAME;
const apiPort = 8000;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${apiPort}.app.github.dev`
  : `http://localhost:${apiPort}`;
