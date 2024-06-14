import { Model } from '@nozbe/watermelondb';
import { date, readonly, text, writer } from '@nozbe/watermelondb/decorators';

import { TableName } from './schema';

export class Win extends Model {
  static table = TableName.Wins;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @text('title') title!: string;
  @text('description') description!: string;

  @writer async edit({
    title,
    description,
  }: Pick<Win, 'title' | 'description'>) {
    await this.update((win) => {
      win.title = title;
      win.description = description;
    });
  }
}
