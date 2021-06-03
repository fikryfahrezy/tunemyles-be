import getText from './repository';

const helloWorld: (random: number) => string = function helloWorld(random: number) {
  if (random > 0.5) return getText();

  return getText();
};

export default helloWorld;
