/* eslint-disable camelcase */
import User from '../models/User';
import user_views from './user_views';

export default {
  render(user: User, token: string) {
    const userFormatted = user_views.render(user);

    return { user: userFormatted, token };
  },
};
