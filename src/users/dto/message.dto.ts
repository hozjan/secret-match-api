import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  readonly message: string;
}
