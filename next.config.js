IS_DEV_ENV = process.env.NODE_ENV === 'development';
ALLOW_LAN_ROUTING = false

/** @type {import('next').NextConfig} */
const nextConfig = {}

if (IS_DEV_ENV) {
    if (ALLOW_LAN_ROUTING) {
        console.log('info  - lanUrl:', `http://${require('address').ip()}:3000`)
    }
}

module.exports = nextConfig
