import Drawable from "../CommonInterfaces.ts/Drawable";

export default abstract class AbstractLevel {

    protected objects: Array<Drawable>;

    constructor(objects: Array<Drawable>) {
        this.objects = objects;
    }

    public abstract start(): void;
    public abstract finish(): void;
}