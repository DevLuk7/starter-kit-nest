import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];

  create(createItemDto: CreateItemDto): Item {
    const item = new Item();
    item.uuid = crypto.randomUUID();
    item.price = createItemDto.price;
    item.createdAt = new Date();
    this.items.push(item);
    return item;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(uuid: string): Item | null {
    const item = this.items.find((item) => item.uuid === uuid);
    return item ?? null;
  }

  update(uuid: string, updateItemDto: UpdateItemDto): Item | null {
    const itemIndex = this.items.findIndex((item) => item.uuid === uuid);
    if (itemIndex === -1) {
      return null;
    }

    if (typeof updateItemDto.price === 'number') {
      this.items[itemIndex].price = updateItemDto.price;
    }

    return this.items[itemIndex];
  }

  remove(uuid: string): Item | null {
    const itemIndex = this.items.findIndex((item) => item.uuid === uuid);
    if (itemIndex === -1) {
      return null;
    }

    const removedItem = this.items[itemIndex];
    this.items.splice(itemIndex, 1);
    return removedItem;
  }
}
