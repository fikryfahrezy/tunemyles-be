import { getText } from "./repository";

export const helloWorld: (random: number) => string = (random: number) => {
    if (random > 0.5) return getText();
    else return getText();
};
