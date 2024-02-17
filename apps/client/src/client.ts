import { AppRouter } from '@mativated-monorepo/server/src/routers';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import baseURL from 'constants';

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: baseURL + '/trpc',
    }),
  ],
});
export async function main() {
  const result = await client.sayHi.query();
  console.log(result);
}

main();
