export default function bindFunctions(f) {
    f.forEach(f => this[f] = this[f].bind(this));
    // some component
    // constructor() {
    // super();
    //     bindFunctions.call(this, ['handleClick']);   // Second argument is array of function names
    // }
}
