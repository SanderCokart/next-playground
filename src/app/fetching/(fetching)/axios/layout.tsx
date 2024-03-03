import type { LayoutType } from '@/app/types/common-types';

export default async function ArticleLayout({ children }: LayoutType) {
  return (
    <main>
      <article className="prose mx-auto max-w-screen-lg py-8 dark:prose-invert prose-a:text-primary prose-code:prose-p:text-primary">
        {children}
      </article>
    </main>
  );
}
