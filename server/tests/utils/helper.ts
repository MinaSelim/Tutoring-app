/**
 * Helper function to indentify wether an object contains a property.
 * The base JS function is not enough for typescript.
 * See https://fettblog.eu/typescript-hasownproperty/
 * @param obj The object to check
 * @param prop The property that we are checking if it exists inside obj
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function hasOwnProperty<X extends {}, Y extends PropertyKey>(
   obj: X,
   prop: Y,
): obj is X & Record<Y, unknown> {
   // eslint-disable-next-line no-prototype-builtins
   return obj.hasOwnProperty(prop);
}
