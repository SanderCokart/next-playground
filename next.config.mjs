import createMDX from '@next/mdx';
import { next as withMillion } from 'million/compiler';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const nextConfig = {
  reactStrictMode: true,
  output: process.env.NEXT_OUTPUT || undefined,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const millionConfig = {
  auto: false,
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: 'tokyo-night',
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

const finalConfig = withMDX(withMillion(nextConfig, millionConfig));

export default finalConfig;
