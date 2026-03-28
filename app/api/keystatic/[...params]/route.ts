export const dynamic = 'force-dynamic';

async function getHandlers() {
  const [{ makeRouteHandler }, { default: config }] = await Promise.all([
    import('@keystatic/next/route-handler'),
    import('../../../../keystatic.config'),
  ]);
  return makeRouteHandler({ config });
}

export async function GET(req: Request) {
  const { GET: handler } = await getHandlers();
  return handler(req);
}

export async function POST(req: Request) {
  const { POST: handler } = await getHandlers();
  return handler(req);
}
