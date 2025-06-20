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
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { User } from 'src/auth/interfaces/user';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(
    @Body() createItemDto: CreateItemDto,
    @CurrentUser() user: User,
  ) {
    console.log('Item created by user:', user.id);
    return this.itemsService.create(createItemDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @CurrentUser() user: User) {
    console.log('Item requested by user:', user.id);
    const item = await this.itemsService.findOne(uuid);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateItemDto: UpdateItemDto,
    @CurrentUser() user: User,
  ) {
    console.log('Item updated by user:', user.id);
    return this.itemsService.update(uuid, updateItemDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @CurrentUser() user: User) {
    console.log('Item deleted by user:', user.id);
    return this.itemsService.remove(uuid);
  }
}
