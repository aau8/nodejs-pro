export const isArray = (value) => {
    return Array.isArray(value)
}

export const isString = (value) => {
    return value.length && !isArray(value)
}