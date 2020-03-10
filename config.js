// This is client side config only - don't put anything in here that shouldn't be public!

export const endpoint = () =>
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4444'
    : 'https://api.entra.io';

export const blogurl = `https://entra.flywheelsites.com/graphql`;
export const perPage = 10;
export const questoinsPerScroll = 12;
