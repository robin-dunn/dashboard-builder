import { Subject } from 'rxjs';
import { IProjectManagerStoreState } from './IProjectManagerStoreState';

export class ProjectManagerStore {

    storeSubject: Subject<IProjectManagerStoreState> = new Subject<IProjectManagerStoreState>();

    storeState: IProjectManagerStoreState = {
            project: null,
            layers: []
        };

    constructor(){}

    public subscribe(selector: any) {
        this.storeSubject.subscribe(selector);
    }

    public update(mutation: any) {
        mutation(this.storeState);
        console.log(this.storeState);
        this.storeSubject.next(this.storeState);
    }
}