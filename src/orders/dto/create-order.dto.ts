import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength, IsInt, IsObject, ValidateNested, Min, IsUUID } from "class-validator";
import { MinCallback } from '../../validators/min-callback.rule';


class CreditCardDTO {
    @MaxLength(16)
    @MinLength(16)
    @IsString()
    @IsNotEmpty()
    number: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @MinCallback(() => new Date().getMonth() + 1)
    @IsInt()
    @IsNotEmpty()
    expiration_month: number;

    @MinCallback(() => new Date().getFullYear())
    @IsInt()
    @IsNotEmpty()
    expiration_year: number;

    @MaxLength(4)
    @IsString()
    @IsNotEmpty()
    cvv: string;
}

class OrderItemDto {
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    quantity: number;
    
    @IsUUID('4')
    @IsString()
    @IsNotEmpty()
    product_id: number;
}

export class CreateOrderDto {
   @Type(() => CreditCardDTO)   
   @ValidateNested()
   @IsObject()     
   @IsNotEmpty()
   credit_card: CreateOrderDto;

   items: OrderItemDto[];
}
