export function parseCookies() {
  const cookies = document.cookie.split("; ");
  return cookies.reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});
}

function base64Decode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

// Function to parse JWT and extract payload
export function parseJwt() {
  const cookies = parseCookies();
  const token = cookies["access_token"];
  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = base64Decode(base64);

    const { user_id, exp } = JSON.parse(jsonPayload);
    return { user_id, exp };
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
}

export function setAuthCookies(accessToken, refreshToken) {
  // Set access token with a short expiry time (e.g., 5 hours)
  document.cookie = `access_token=${accessToken}; path=/; max-age=${
    5 * 60 * 60
  }; secure; SameSite=Strict`;

  // Set refresh token with a longer expiry time (e.g., 7 days)
  document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${
    7 * 24 * 60 * 60
  }; secure; SameSite=Strict`;
}

export function clearCookies() {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }
}
