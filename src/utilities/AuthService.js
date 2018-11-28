export function setToken(tokenName, token) {
  localStorage.setItem(tokenName, token);
}

export function getToken(tokenName) {
  return localStorage.getItem(tokenName);
}

export function readToken(tokenName) {
  return decodeToken(getToken(tokenName));
}

export function clearToken(tokenName) {
  localStorage.removeItem(tokenName);
}

export function validateToken(tokenName) {
  const token = getToken(tokenName);
  return !!token && !isTokenExpired(token);
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

function getTokenExpirationDate(encodedToken) {
  const token = decodeToken(encodedToken);
  if (!token || !token.exp) {
    return null;
  }
  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

function decodeToken(encodedToken) {
  if (!encodedToken) return;
  let parts = encodedToken.split(".");

  if (parts.length !== 3) return;

  let decodedToken = URLBase64Decode(parts[1]);
  if (!decodedToken) return;
  return JSON.parse(decodedToken);
}

function URLBase64Decode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0: {
      break;
    }
    case 2: {
      output += "==";
      break;
    }
    case 3: {
      output += "=";
      break;
    }
    default: {
      return;
    }
  }
  //polifyll https://github.com/davidchambers/Base64.js
  return decodeURIComponent(escape(window.atob(output)));
}