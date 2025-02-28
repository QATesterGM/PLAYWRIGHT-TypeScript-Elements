import { generateRandomNumber } from './debug-random-number.utils';
import { nameToLowerCase } from './debug-username.utils';

export function getRandomName(): string {
  let randomName = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = generateRandomNumber();
  let counter = 0;
  while (counter < charactersLength) {
    randomName += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return nameToLowerCase(randomName);
}

export function getRandomPassword(): string {
  let randomPassword = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_';
  const charactersLength = generateRandomNumber();
  let counter = 0;
  while (counter < charactersLength) {
    randomPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return randomPassword;
}