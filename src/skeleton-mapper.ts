import { ObjectBody, Skeleton } from "./types";

function findValue(keysTree: string[], data: ObjectBody) {
    if (!data) {
        return undefined;
    }
    const key = keysTree.shift();
    if (keysTree.length) {
        return findValue(keysTree, data[key]);
    }
    return data[key];
}

function mapDataIntoTemplate(source: ObjectBody, skeleton: Skeleton, addUndefinedFields: boolean) {
    const keys = Object.keys(skeleton);
    const r = {};
    keys.map((key) => {
        if (skeleton[key] instanceof Object) {
            r[key] = mapDataIntoTemplate(source, skeleton[key] as ObjectBody, addUndefinedFields);
        }
        else {
            const value = findValue((skeleton[key] as string).split("."), source);
            if (value || addUndefinedFields) {
                r[key] = value;
            }
        }
    });
    return r;
}

export function skeletonMap(
    source: ObjectBody | ObjectBody[],
    skeleton: Skeleton,
    addUndefinedFields = false
): ObjectBody | ObjectBody[] {
    if (source instanceof Array) {
        return source.map((sourceElement) => mapDataIntoTemplate(sourceElement, skeleton, addUndefinedFields));
    }
    return mapDataIntoTemplate(source, skeleton, addUndefinedFields);
}
