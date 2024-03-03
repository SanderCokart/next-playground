import createMDX from '@next/mdx';
import { next as withMillion } from 'million/compiler';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';

const nextConfig = {
  reactStrictMode: true,
  output: process.env.NEXT_OUTPUT || undefined,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const millionConfig = {
  auto: false,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeMdxCodeProps],
  },
});

const finalConfig = withMDX(withMillion(nextConfig, millionConfig));

export default finalConfig;
