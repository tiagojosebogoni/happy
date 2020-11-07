import { hash, compare } from 'bcryptjs';

import IHashProvider from '../HashProvider/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  generate(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
