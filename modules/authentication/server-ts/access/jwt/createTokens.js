import jwt from 'jsonwebtoken';

import settings from '../../../../../settings';

const { tokenExpiresIn, refreshTokenExpiresIn } = settings.auth.jwt;

const createTokens = async (identity, secret, refreshSecret) => {
  const createToken = jwt.sign({ identity }, secret, { expiresIn: tokenExpiresIn });

  const createRefreshToken = jwt.sign({ id: identity.id }, refreshSecret, { expiresIn: refreshTokenExpiresIn });

  return Promise.all([createToken, createRefreshToken]);
};

export default createTokens;