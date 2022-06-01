import cookie from 'js-cookie';

export const constructUserFromCookies = () => {
    console.log("trying to construct user from cookie");
    console.log(cookie.get("username"))
    console.log(cookie.get("accessToken"))
    return {
        username: cookie.get("username"),
        accessToken: cookie.get("accessToken"), 
    }
}

export const userIsAuthenticated = () => {
  const user = constructUserFromCookies();
  console.log("USER AUTH: " + user.username != "");
  console.log("USER AUTH: " + user.accessToken != "");
  console.log("USER AUTH: " + user.username != null);
  console.log("USER AUTH: " + user.accessToken != null);
  return user.username !== ""  
      && user.accessToken !== "" 
      && typeof user.username !== 'undefined'
      && typeof user.accessToken !== 'undefined'
      && user.username !== 'null' 
      && user.accessToken !== 'null';
}