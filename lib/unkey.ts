import { Unkey } from "@unkey/api";
import { Ratelimit } from "@unkey/ratelimit"
import ms from "ms";

export const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY });

export const rateLimiter = new Ratelimit({
  rootKey: process.env.UNKEY_ROOT_KEY,
  namespace: "cat",
  limit: 5,
  duration: ms("1m"),
  async: true
})


export const UNKEY_API_ID = "api_4YGGcKsUHTNDjrpkKrAWMgCeXzaa"
export const UNKEY_API_PREFIX = "cat"
