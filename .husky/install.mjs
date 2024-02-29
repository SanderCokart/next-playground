/**
 * In case dev dependencies are not installed, this script will make sure the husky prepare script won't fail.
 */
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
    process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())