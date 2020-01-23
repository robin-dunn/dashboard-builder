import { Subject } from "rxjs";
import { IAppStoreState } from "./IAppStoreState";

export class _AppStore {

    private storeSubject: Subject<IAppStoreState> = new Subject<IAppStoreState>();

    private storeState: IAppStoreState = {
            currentView: "map",
            currentSideMenu: ""
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