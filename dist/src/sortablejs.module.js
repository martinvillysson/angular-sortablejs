var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { GLOBALS } from './globals';
import { SortablejsDirective } from './sortablejs.directive';
import { SortablejsService } from './sortablejs.service';
var SortablejsModule = (function () {
    function SortablejsModule() {
    }
    SortablejsModule_1 = SortablejsModule;
    SortablejsModule.forRoot = function (globalOptions) {
        return {
            ngModule: SortablejsModule_1,
            providers: [
                SortablejsService,
                { provide: GLOBALS, useValue: globalOptions }
            ]
        };
    };
    var SortablejsModule_1;
    SortablejsModule = SortablejsModule_1 = __decorate([
        NgModule({
            declarations: [SortablejsDirective],
            exports: [SortablejsDirective],
            providers: [SortablejsService]
        })
    ], SortablejsModule);
    return SortablejsModule;
}());
export { SortablejsModule };
//# sourceMappingURL=sortablejs.module.js.map