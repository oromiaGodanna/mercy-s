

export class Organization {
    public id: number;
    public name: string;
    public description: string;

    constructor(name: string, desc: string, id? : number) {
        this.id = id || new Date().getTime();
        this.name = name;
        this.description = desc;
    }
}
