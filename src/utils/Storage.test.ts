import { Storage } from './Storage';

describe('Storage', () => {
  it('allows storing and retrieving of key-value pairs', () => {
    const key = 'favoriteFlavor';
    const value = 'Coffee Almond Fudge';
    Storage.set(key, value);
    const flavor = Storage.get(key);
    expect(flavor).toBe(value);
  });

  it('allows returning default values for keys', () => {
    const key = 'favoriteFruit';
    const defaultValue = 'Mango';
    const fruit = Storage.get(key, defaultValue);
    expect(fruit).toBe(defaultValue);
  });

  it('allows removal of keys', () => {
    const key = 'favoriteCar';
    const value = 'Tesla';
    const defaultValue = 'Lexus';
    Storage.set(key, value);

    let car = Storage.get(key, defaultValue);
    expect(car).toBe(value);

    Storage.remove(key);

    car = Storage.get(key, defaultValue);
    expect(car).toBe(defaultValue);
  });
});
