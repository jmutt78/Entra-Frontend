export const navLinks = [
  {
    name: 'Blog',
    target: '/blog'
  },
  {
    name: 'Stories',
    target: '/stories'
  }
];

export const blogLinks = [
  {
    name: 'Entra Tips',
    target: '/blog'
  },

  {
    name: 'Entra Interviews',
    target: '/stories'
  }
];

export const createLinks = isLoggedIn => [
  {
    name: 'Ask a Question',
    target: isLoggedIn ? '/qa' : '/signup'
  },

  {
    name: 'Create Idea',
    target: isLoggedIn ? '/idea/create' : '/signup'
  }
];

export const adminLinks = [
  {
    name: 'Approve Questions',
    target: '/approval/question-list'
  },
  {
    name: 'Approve Answers',
    target: '/approval/answer-list'
  }
];

export const ideaLinks = [
  {
    name: 'My Ideas',
    target: '/idea/my-ideas'
  },

  {
    name: 'Community Ideas',
    target: '/idea/public'
  }
];

export const questionLinks = [
  {
    name: 'My Feed',
    target: '/myfeed'
  },

  {
    name: 'Latest Questions',
    target: '/all'
  },
  {
    name: 'My Questions',
    target: '/myquestions'
  },
  {
    name: 'My Answers',
    target: '/myanswers'
  },
  {
    name: 'My Bookmarks',
    target: '/mybookmarks'
  }
];
