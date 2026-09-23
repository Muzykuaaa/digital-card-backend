import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Professional link: GitHub, Telegram, email, etc.' })
export class Link {
  @Field(() => ID)
  declare id: number;

  @Field({ description: 'Short link label' })
  declare label: string;

  @Field({ description: 'Link target URL' })
  declare url: string;
}
