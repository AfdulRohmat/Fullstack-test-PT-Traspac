// auth status variable
let authenticated = false;

// return auth status
export const authenticateStatus = () => authenticated;

// set auth status to authenticated
export const isAuthenticate = () => {
  authenticated = true;
};

// set auth status to unauthenticated
export const unauthenticateUser = () => {
  authenticated = false;
};
