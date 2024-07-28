export function circularPushMap(a: number[], amount: number) {
    const result: {[key: number]: number} = {}
    Array.from({length: a.length}).forEach((_, idx) => {
        result[a[idx]] = a[(idx + amount) % a.length]
    })
    return result
}