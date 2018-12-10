import Cryptr from 'cryptr';

const VERY_SECRET_KEY = 'very-secret-key-btw-who-are-you-and-what-are-you-doing-here-well-hello-anyway';

export const encrypt = value => new Cryptr(VERY_SECRET_KEY).encrypt(value);

export const decrypt = value => {
  try {
    return new Cryptr(VERY_SECRET_KEY).decrypt(value);
  } catch(error) {
    return null;
  }
}

export default {
  encrypt,
  decrypt
};
