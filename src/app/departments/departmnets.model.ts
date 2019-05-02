
export class Department {
    public id: number;
    public name: string;
    public description: string;
    public parent_id: number;
    public organization_id: number;

    constructor(name: string, desc: string, parentDept: number, organization: number, id?: number) {
        this.id = id || new Date().getTime();
        this.name = name;
        this.description = desc;
        this.parent_id = parentDept;
        this.organization_id = organization;
    }
}
