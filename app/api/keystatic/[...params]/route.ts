export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const [{ makeRouteHandler }, { default: config }] = await Promise.all([
    import('@keystatic/next/route-handler'),
    import('../../../../keystatic.config'),
  ]);
  const { GET: handler } = makeRouteHandler({ config });
  return handler(req);
}

export async function POST(req: Request) {
  const [{ makeRouteHandler }, { default: config }] = await Promise.all([
    import('@keystatic/next/route-handler'),
    import('../../../../keystatic.config'),
  ]);
  const { POST: handler } = makeRouteHandler({ config });
  return handler(req);
}
