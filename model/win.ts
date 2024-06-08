import { Model } from '@nozbe/watermelondb';
import { text, readonly, date, nochange } from '@nozbe/watermelondb/decorators';

import { TableName } from './schema';

export class Win extends Model {
  static table = TableName.Wins;

  @text('title') title!: string;
  @text('description') description!: string;

  // Automatic tracking
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
