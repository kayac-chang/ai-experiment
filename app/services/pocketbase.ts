import { EventSource } from 'eventsource';
import PocketBase from 'pocketbase';
import { env } from '~/env.server';

// Extend the global namespace to include our PocketBase instance
declare global {
  var __PB__: PocketBase;
}

export default async function instance() {
  // Initialize PocketBase if it doesn't exist yet
  if (!global.__PB__) {
    // Set EventSource for PocketBase to work in Node.js environment
    global.EventSource = EventSource;
    global.__PB__ = new PocketBase(env.POCKETBASE_URL);
    await global.__PB__
      .collection('_superusers')
      .authWithPassword(env.POCKETBASE_USER, env.POCKETBASE_PASSWORD);
  }

  return global.__PB__;
}
