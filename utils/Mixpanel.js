import mixpanel from 'mixpanel-browser';

const mix = () =>
  process.env.NODE_ENV !== 'production'
    ? '//////////'
    : '59a5230bfd7a84ed31296264899ab6e6';
mixpanel.init(mix);

let actions = {
  identify: id => {
    if (process.env.NODE_ENV === 'production') {
      mixpanel.identify(id);
    }
  },
  alias: id => {
    if (process.env.NODE_ENV === 'production') {
      mixpanel.alias(id);
    }
  },
  track: (name, props) => {
    if (process.env.NODE_ENV === 'production') {
      mixpanel.track(name, props);
    }
  },
  people: {
    set: props => {
      if (process.env.NODE_ENV === 'production') {
        mixpanel.people.set(props);
      }
    }
  }
};

export let Mixpanel = actions;
