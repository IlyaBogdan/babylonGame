import Drawable from "../CommonInterfaces.ts/Drawable";

export default abstract class AbstractCharacter implements Drawable {

    abstract render(): void;

}