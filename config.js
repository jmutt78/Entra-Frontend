// This is client side config only - don't put anything in here that shouldn't be public!

export const endpoint = (env => {
  switch (env) {
    case 'development':
      return `http://localhost:4444`;
    default:
      return 'https://api.entra.io';
  }
})(process.env.NODE_ENV);

export const blogurl = `https://entra.flywheelsites.com/graphql`;
export const perPage = 10;
