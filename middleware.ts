import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const module = 'meows'
const getAction = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', withId = false) => {
  switch (method) {
    case 'GET':
      return withId ? 'view' : 'list';
    case 'POST':
      return `create`
    case 'PUT':
      return 'update';
    case 'DELETE':
      return `delete`;
    default:
      throw new Error(`Invalid method ${method}`)
  }
}
const getTokenDetails = (token: string) => {
  return {
    permissions: [
      'meows~create~all',
      'meows~view~all',
      'meows~update~all',
      'meows~delete~all',
      'meows~list~all',
    ],
    requester: 'cm2oulkgu000012kw9cspfyy1'
  }
}
interface Params {
  id?: string;
}


export function middleware(req: NextRequest, context: { params?: Params }) {
  try {
    const auth = req.headers.get('Authorization') || 'Bearer ';
    const token = auth.slice(7); // remove 'Bearer ' from the beginning of the token
    if (!token || token !== 'expected-token') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const { permissions, requester } = getTokenDetails(token);
    const action = getAction(req.method as 'GET' | 'POST', !!context.params?.id);
    const foundPermission = permissions.find(permission => permission.startsWith(`${module}~${action}~`));
    if (!foundPermission) {
      return NextResponse.json({ message: 'Insufficient permissions' }, { status: 403 });
    }
    const [_, __, scope] = foundPermission.split(',');
    const reqHeaders = new Headers(req.headers)
    reqHeaders.set('x-api-scope', scope)
    reqHeaders.set('x-api-user', requester)


    const res = NextResponse.next({ request: { headers: reqHeaders } })
    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return res
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong with this request, please try again later!", data: (error as Error).message }, { status: 500 });
  }
}
export const config = {
  matcher: '/api/:path*'
}
