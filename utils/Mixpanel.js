import mixpanel from 'mixpanel-browser';
const mix = '59a5230bfd7a84ed31296264899ab6e6';
//const mix = '//////////';
mixpanel.init(mix);

let actions = {
  identify: id => {
    mixpanel.identify(id);
  },
  alias: id => {
    mixpanel.alias(id);
  },
  track: (name, props) => {
    mixpanel.track(name, props);
  },
  people: {
    set: props => {
      mixpanel.people.set(props);
    }
  }
};

export let Mixpanel = actions;
