var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ElementRef, Inject, Input, NgZone, Optional, Renderer2 } from '@angular/core';
import { GLOBALS } from './globals';
import { SortablejsBindings } from './sortablejs-bindings';
import { SortablejsService } from './sortablejs.service';
var OriginalSortable = require('sortablejs');
var SortablejsDirective = (function () {
    function SortablejsDirective(globalConfig, service, element, zone, renderer) {
        this.globalConfig = globalConfig;
        this.service = service;
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.runInsideAngular = false;
    }
    SortablejsDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.runInsideAngular) {
            this._sortable = OriginalSortable.create(this.element.nativeElement, this.options);
        }
        else {
            this.zone.runOutsideAngular(function () {
                _this._sortable = OriginalSortable.create(_this.element.nativeElement, _this.options);
            });
        }
    };
    SortablejsDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var optionsChange = changes['inputOptions'];
        if (optionsChange && !optionsChange.isFirstChange()) {
            var previousOptions_1 = optionsChange.previousValue;
            var currentOptions_1 = optionsChange.currentValue;
            Object.keys(currentOptions_1).forEach(function (optionName) {
                if (currentOptions_1[optionName] !== previousOptions_1[optionName]) {
                    _this._sortable.option(optionName, _this.options[optionName]);
                }
            });
        }
    };
    SortablejsDirective.prototype.ngOnDestroy = function () {
        if (this._sortable) {
            this._sortable.destroy();
        }
    };
    SortablejsDirective.prototype.getBindings = function () {
        if (!this.sortablejs) {
            return new SortablejsBindings([]);
        }
        else if (this.sortablejs instanceof SortablejsBindings) {
            return this.sortablejs;
        }
        else {
            return new SortablejsBindings([this.sortablejs]);
        }
    };
    Object.defineProperty(SortablejsDirective.prototype, "options", {
        get: function () {
            return __assign({}, this.optionsWithoutEvents, this.overridenOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortablejsDirective.prototype, "optionsWithoutEvents", {
        get: function () {
            return __assign({}, (this.globalConfig || {}), (this.inputOptions || {}));
        },
        enumerable: true,
        configurable: true
    });
    SortablejsDirective.prototype.proxyEvent = function (eventName) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.zone.run(function () {
            var _a;
            if (_this.optionsWithoutEvents && _this.optionsWithoutEvents[eventName]) {
                (_a = _this.optionsWithoutEvents)[eventName].apply(_a, params);
            }
        });
    };
    Object.defineProperty(SortablejsDirective.prototype, "isCloning", {
        get: function () {
            return this._sortable.options.group.checkPull(this._sortable, this._sortable) === 'clone';
        },
        enumerable: true,
        configurable: true
    });
    SortablejsDirective.prototype.clone = function (item) {
        return (this.inputCloneFunction || (function (_item) { return _item; }))(item);
    };
    Object.defineProperty(SortablejsDirective.prototype, "overridenOptions", {
        get: function () {
            var _this = this;
            return {
                onAdd: function (event) {
                    _this.service.transfer = function (items) {
                        _this.getBindings().injectIntoEvery(event.newIndex, items);
                        _this.proxyEvent('onAdd', event);
                    };
                    _this.proxyEvent('onAddOriginal', event);
                },
                onRemove: function (event) {
                    var bindings = _this.getBindings();
                    if (bindings.provided) {
                        if (_this.isCloning) {
                            _this.service.transfer(bindings.getFromEvery(event.oldIndex).map(function (item) { return _this.clone(item); }));
                            _this.renderer.removeChild(event.item.parentNode, event.item);
                            _this.renderer.insertBefore(event.clone.parentNode, event.item, event.clone);
                            _this.renderer.removeChild(event.clone.parentNode, event.clone);
                        }
                        else {
                            _this.service.transfer(bindings.extractFromEvery(event.oldIndex));
                        }
                        _this.service.transfer = null;
                    }
                    _this.proxyEvent('onRemove', event);
                },
                onUpdate: function (event) {
                    var bindings = _this.getBindings();
                    bindings.injectIntoEvery(event.newIndex, bindings.extractFromEvery(event.oldIndex));
                    _this.proxyEvent('onUpdate', event);
                },
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SortablejsDirective.prototype, "sortablejs", void 0);
    __decorate([
        Input('sortablejsOptions'),
        __metadata("design:type", Object)
    ], SortablejsDirective.prototype, "inputOptions", void 0);
    __decorate([
        Input('sortablejsCloneFunction'),
        __metadata("design:type", Function)
    ], SortablejsDirective.prototype, "inputCloneFunction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SortablejsDirective.prototype, "runInsideAngular", void 0);
    SortablejsDirective = __decorate([
        Directive({
            selector: '[sortablejs]'
        }),
        __param(0, Optional()), __param(0, Inject(GLOBALS)),
        __metadata("design:paramtypes", [Object, SortablejsService,
            ElementRef,
            NgZone,
            Renderer2])
    ], SortablejsDirective);
    return SortablejsDirective;
}());
export { SortablejsDirective };
//# sourceMappingURL=sortablejs.directive.js.map