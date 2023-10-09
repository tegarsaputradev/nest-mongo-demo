import * as bcrypt from 'bcrypt';

export function make(password: string): string {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export function compare(password: string, hash: string): boolean {
  if (!password || !hash) {
    return false;
  }
  return bcrypt.compareSync(password, hash);
}
