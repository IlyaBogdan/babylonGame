import Main from "../../Caracters/Main/Main";
import AbstractLevel from "../AbstractLevel";

export default class Level_1 extends AbstractLevel {

    constructor() {
        super([new Main()]);
    }

    public start(): void {};
    public finish(): void {};
}