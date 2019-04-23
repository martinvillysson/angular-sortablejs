import { SortablejsBinding } from './sortablejs-binding';
var SortablejsBindings = (function () {
    function SortablejsBindings(bindingTargets) {
        this.bindings = bindingTargets.map(function (target) { return new SortablejsBinding(target); });
    }
    SortablejsBindings.prototype.injectIntoEvery = function (index, items) {
        this.bindings.forEach(function (b, i) { return b.insert(index, items[i]); });
    };
    SortablejsBindings.prototype.getFromEvery = function (index) {
        return this.bindings.map(function (b) { return b.get(index); });
    };
    SortablejsBindings.prototype.extractFromEvery = function (index) {
        return this.bindings.map(function (b) { return b.remove(index); });
    };
    Object.defineProperty(SortablejsBindings.prototype, "provided", {
        get: function () {
            return !!this.bindings.length;
        },
        enumerable: true,
        configurable: true
    });
    return SortablejsBindings;
}());
export { SortablejsBindings };
//# sourceMappingURL=sortablejs-bindings.js.map