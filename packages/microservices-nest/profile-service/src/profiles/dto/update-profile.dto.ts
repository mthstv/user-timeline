import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  username?: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
}
