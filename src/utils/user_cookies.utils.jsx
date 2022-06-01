import cookie from 'js-cookie';

export const constructUserFromCookies = () => {
    return {
        username: cookie.get("username"),
        accessToken: cookie.get("accessToken"), 
    }
}

export const userIsAuthenticated = () => {
  const user = constructUserFromCookies();
  return user.username !== ""  
      && user.accessToken !== "" 
      && typeof user.username !== 'undefined'
      && typeof user.accessToken !== 'undefined'
      && user.username !== 'null' 
      && user.accessToken !== 'null';
}