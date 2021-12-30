import { IsNotEmpty, Length } from 'class-validator';

export class CreatePasteDto {
  @IsNotEmpty()
  @Length(0, 5000)
  content: string;
}
