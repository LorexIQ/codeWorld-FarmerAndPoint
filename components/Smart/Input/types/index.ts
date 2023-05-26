interface RegexObgValue {
    pattern: RegExp
    error: string
}
type RegexObg = {
    [name: string]: RegexObgValue
}
