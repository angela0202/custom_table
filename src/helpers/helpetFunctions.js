export const isEqual = (obj1, obj2) => {
    if (obj1 && obj2 && typeof obj1 === 'object' && typeof obj2 === 'object' &&
        obj1.constructor === Object && obj2.constructor === Object) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    } else if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    return obj1 === obj2;
};