import {ErrorHandler, Injectable} from '@angular/core';
import { DataProvider } from '../providers/data.provider';

@Injectable()
export class CustomErrorHandlerService extends ErrorHandler {

    constructor(private dataProvider: DataProvider) {
        super();
    }

    handleError(error) {
        // Here you can provide whatever logging you want
        this.dataProvider.logs.push(error.message);
        super.handleError(error);
    }
}