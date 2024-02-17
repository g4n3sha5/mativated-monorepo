import { Webhook, WebhookRequiredHeaders, WebhookUnbrandedRequiredHeaders } from 'svix';
import { Request, Response } from 'express';
import { trpc } from '@/trpc';
import { TRPCError } from '@trpc/server';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { IncomingHttpHeaders } from 'http';
export const dynamic = 'force-dynamic';

type ApiRequestWithSvixRequiredHeaders = Request & {
  headers: WebhookRequiredHeaders | WebhookUnbrandedRequiredHeaders;
};

export async function POST(req: ApiRequestWithSvixRequiredHeaders, res: Response) {
  console.log('IM IN');
  const WEBHOOK_SECRET =
    process.env.NODE_ENV === 'production' ? process.env.CLERK_WEBHOOK_SECRET : process.env.CLERK_WEBHOOK_SECRET_TEST;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }
  const request = await req;
  const payload = request.body;
  const headers = request.headers;

  // const svix_id = request.get('svix-id');
  // const svix_timestamp = request.get('svix-timestamp');
  // const svix_signature = request.get('svix-signature');
  // // If there are no headers, error out
  // if (!svix_id || !svix_timestamp || !svix_signature) {
  //   return trpc.procedure.query(() => 'Error occured -- no svix headers');
  // }

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
  if (evt) {
    // 👉 Parse the incoming event body into a ClerkWebhook object
    try {
      // 👉 `webhook.type` is a string value that describes what kind of event we need to handle
      if (evt.type === 'user.updated' || evt.type === 'user.created') {
        let user = {
          userName: evt.data.username,
          displayName: `${evt.data.first_name} ${evt.data.last_name}`,
        };
        console.log(user);
      }

      trpc.procedure.query(() => 'Webhook received');
      res.status(200).send('OK');
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: 'PARSE_ERROR',
      });
    }
  }
}
