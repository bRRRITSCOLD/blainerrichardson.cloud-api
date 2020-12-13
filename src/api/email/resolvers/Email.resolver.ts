// node modules
// import { Resolver, Query, FieldResolver, Root, Args } from 'type-graphql';
import { Resolver, Query, Ctx, Mutation, Arg, Args } from 'type-graphql';
import * as _ from 'lodash';
import { Service } from 'typedi';

// libraries
import { anyUtils } from '../../../lib/utils/any';
import { logger } from '../../../lib/logger';

// models
import { APIError } from '../../../models/error';
import { SendEmailInputType } from '../types/SendEmailInputType';
import { SendEmailOutputType } from '../types/SendEmailOutputType';

// services
import { EmailService } from '../services/Email.service';

class Email {}

@Service()
@Resolver((_of: unknown) => Email)
export class EmailResolver {
  public constructor(private readonly emailService: EmailService) {}

  @Mutation((_returns: unknown) => SendEmailOutputType)
  public async sendEmail(@Ctx() _context: any, @Arg('data') sendEmailInputType: SendEmailInputType): Promise<SendEmailOutputType> {
    try {
      // deconstruct request for ease here
      const [email]: any[] = [_.get(sendEmailInputType, 'email')];

      // call service to end email
      const sendEmailResponse: any = await this.emailService.sendEmail(email);

      // return explicitly for end
      // user to handle http response
      return sendEmailResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}TwitterAccessService::#twitterOAuthAccessToken::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
