import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const newProfile = this.profilesRepository.create({ ...createProfileDto });
    return this.profilesRepository.save(newProfile);
  }

  findAll(): Promise<Profile[]> {
    return this.profilesRepository.find();
  }

  findOne(params: { id?: string; userId?: string }) {
    return this.profilesRepository.findOneBy({ ...params });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.profilesRepository.update(id, { ...updateProfileDto });
  }

  remove(id: string) {
    return this.profilesRepository.delete(id);
  }
}
