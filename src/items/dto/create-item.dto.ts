import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'The price of the item',
    example: 29.99,
    type: Number,
  })
  price: number;
}
