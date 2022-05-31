import cookie from 'js-cookie';

export const constructUserFromCookies = () => {
    console.log("trying to construct user from cookie");
    return {
        username: cookie.get("username"),
        accessToken: cookie.get("accessToken"), 
    }
}

export const userIsAuthenticated = () => {
  const user = constructUserFromCookies();
  return user.username && user.accessToken;
}