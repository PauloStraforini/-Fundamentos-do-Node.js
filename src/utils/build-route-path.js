export default function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParameters = path.replace(routeParametersRegex, '(?<id>[a-zA-Z0-9-]+)')

    const pathRegex = new RegExp(`^${pathWithParameters}$`)

    return pathRegex
}