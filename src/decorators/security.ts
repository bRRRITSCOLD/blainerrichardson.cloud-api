// node_modules
import * as _ from 'lodash';
import { createMethodDecorator } from 'type-graphql';
import { MethodAndPropDecorator } from 'type-graphql/dist/decorators/types';

// libraries
import * as jsonwebtoken from '../lib/jwt';

// data-managers/management
import * as userManager from '../data-management/user';

export function ScopeAuthorization(): MethodAndPropDecorator;
export function ScopeAuthorization<RoleType = string>(roles: RoleType[]): MethodAndPropDecorator;
export function ScopeAuthorization<RoleType = string>(...roles: RoleType[]): MethodAndPropDecorator;
export function ScopeAuthorization<RoleType = string>(...rolesOrRolesArray: RoleType[]): MethodDecorator | PropertyDecorator {
  return createMethodDecorator(async (ctx: any, next) => {
    jsonwebtoken.roles(ctx.context.reply.request.headers.authorization, (rolesOrRolesArray[0] as unknown) as string[]);
    return next();
  });
}

export function JWTAuthorization(): MethodAndPropDecorator;
export function JWTAuthorization(): MethodDecorator | PropertyDecorator {
  return createMethodDecorator(async (ctx: any, next) => {
    jsonwebtoken.verify(ctx.context.reply.request.headers.authorization);

    return next();
  });
}

export function CurrentUser(): MethodAndPropDecorator;
export function CurrentUser(): MethodDecorator | PropertyDecorator {
  return createMethodDecorator(async (ctx: any, next) => {
    // check to see if a user has been grabbed from a authorization
    // header before - let's load user data here if not as to centralize
    // the location we get roles data for possible scoper authorization's on properties
    if (!ctx.context.user) {
      const decodedJWT = jsonwebtoken.decode(ctx.context.reply.request.headers.authorization);

      const searchUsersResponse = await userManager.searchUsers({
        searchCriteria: { userId: (decodedJWT as any).userId },
        searchOptions: { pageNumber: 1, pageSize: 1 },
      });

      if (!searchUsersResponse.users[0]) {
        throw new Error('No user found.');
      }

      ctx.context.user = _.assign({}, searchUsersResponse.users.slice()[0], { passwordHash: undefined, _id: undefined });
    }

    return next();
  });
}
