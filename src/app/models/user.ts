export class User {
    userId: number;
    id: number;
    title: string;
    body: string;
    isOkay: boolean;
    constructor(response: any){
        this.userId = response.userId;
        this.id = response.id;
        this.title = response.title;
        this.body = response.body;
        this.isOkay = (this.id == 1)
    }
    
}
