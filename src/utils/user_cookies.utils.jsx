import cookie from 'js-cookie';

export const constructUserFromCookies = () => {
    return {
        username: cookie.get("username"),
        userId: cookie.get("userId"),
        accessToken: cookie.get("accessToken"), 
    }
}

export const userIsAuthenticated = () => {
  const user = constructUserFromCookies();
  return user.username && user.userId && user.accessToken;
}