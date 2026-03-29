import { config, collection, singleton, fields } from '@keystatic/core';

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
  singletons: {
    profile: singleton({
      label: '个人信息',
      path: 'content/profile',
      schema: {
        name: fields.text({ label: '姓名' }),
        quote: fields.text({ label: '金句', multiline: true }),
        identityTags: fields.text({ label: '身份标签', description: '用 · 分隔，如"律师 · 写作者 · 程序员"' }),
        intro: fields.text({ label: '一句话介绍', multiline: true }),
        avatarAlt: fields.text({ label: '头像 alt 文字' }),
      },
    }),
    about: singleton({
      label: '关于我',
      path: 'content/about',
      schema: {
        paragraphs: fields.array(
          fields.text({ label: '段落', multiline: true }),
          { label: '关于段落', itemLabel: (props) => props.value.slice(0, 30) + '…' }
        ),
        currentProject: fields.text({ label: '目前在做', description: '当前进行中的项目或事务' }),
      },
    }),
    footer: singleton({
      label: '联系方式',
      path: 'content/footer',
      schema: {
        contactText: fields.text({ label: '联系提示语' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: '名称', description: '如 Email, GitHub, Twitter' }),
            href: fields.text({ label: '链接', description: '如 mailto:xxx 或 https://...' }),
          }),
          { label: '联系链接', itemLabel: (props) => props.fields.label.value }
        ),
        copyright: fields.text({ label: '版权署名' }),
      },
    }),
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
        category: fields.select({
          label: '分类',
          options: [
            { label: '法律思考', value: 'law' },
            { label: '技术', value: 'tech' },
            { label: '随笔', value: 'essay' },
            { label: '阅读', value: 'reading' },
          ],
          defaultValue: 'essay',
        }),
        tags: fields.array(
          fields.text({ label: '标签' }),
          { label: '标签', itemLabel: (props) => props.value }
        ),
        summary: fields.text({ label: '摘要', multiline: true }),
        content: fields.mdx({ label: '内容' }),
      },
    }),
    projects: collection({
      label: '项目',
      slugField: 'name',
      path: 'content/projects/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: '项目名' } }),
        description: fields.text({ label: '描述', multiline: true }),
        url: fields.text({ label: '链接' }),
        category: fields.select({
          label: '分类',
          options: [
            { label: 'Web 应用', value: 'web' },
            { label: '工具', value: 'tool' },
            { label: '开源', value: 'opensource' },
            { label: '实验', value: 'experiment' },
          ],
          defaultValue: 'tool',
        }),
        featured: fields.checkbox({ label: '首页推荐', defaultValue: false }),
      },
    }),
  },
});
