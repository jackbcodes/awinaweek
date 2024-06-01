import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

import { TableName } from './schema';

export class Win extends Model {
  static table = TableName.Wins;

  @text('title') title!: string;
  @text('description') description!: string;
}
