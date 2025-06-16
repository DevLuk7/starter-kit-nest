import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database.module';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, NewItem, items } from './entities/item.entity';
import * as schema from '../database/schema';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem: NewItem = {
      price: createItemDto.price.toString(),
    };

    const [item] = await this.db.insert(items).values(newItem).returning();
    return item;
  }

  async findAll(): Promise<Item[]> {
    return await this.db.select().from(items);
  }

  async findOne(uuid: string): Promise<Item | null> {
    const [item] = await this.db
      .select()
      .from(items)
      .where(eq(items.uuid, uuid));

    return item ?? null;
  }

  async update(
    uuid: string,
    updateItemDto: UpdateItemDto,
  ): Promise<Item | null> {
    if (typeof updateItemDto.price !== 'number') {
      return null;
    }

    const [item] = await this.db
      .update(items)
      .set({ price: updateItemDto.price.toString() })
      .where(eq(items.uuid, uuid))
      .returning();

    return item ?? null;
  }

  async remove(uuid: string): Promise<Item | null> {
    const [item] = await this.db
      .delete(items)
      .where(eq(items.uuid, uuid))
      .returning();

    return item ?? null;
  }
}
