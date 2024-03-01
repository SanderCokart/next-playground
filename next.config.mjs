import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: process.env.NEXT_OUTPUT || undefined,
};

const millionConfig = {
    auto: {
        rsc: true
    }
}

const finalConfig = million.next(nextConfig, millionConfig)

export default finalConfig;
