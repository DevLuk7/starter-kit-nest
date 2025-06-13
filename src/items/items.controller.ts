import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    const item = this.itemsService.findOne(uuid);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(uuid, updateItemDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.itemsService.remove(uuid);
  }
}
