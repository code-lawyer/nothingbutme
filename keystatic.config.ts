// keystatic.config.ts
import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'code-lawyer',
      name: 'nothingbutme',
    },
  },
  ui: {
    brand: { name: 'nothingbutme' },
  },
  collections: {
    articles: collection({
      label: '文章',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        date: fields.date({
          label: '日期',
          defaultValue: { kind: 'today' },
        }),
        tags: fields.array(
          fields.text({ label: '标签' }),
          { label: '标签', itemLabel: (props) => props.value }
        ),
        summary: fields.text({ label: '摘要', multiline: true }),
        content: fields.mdx({ label: '内容' }),
      },
    }),
  },
});
