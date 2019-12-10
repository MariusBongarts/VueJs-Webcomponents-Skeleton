import { Entity } from './entity';
export interface Tag extends Entity {
  name: string;
  _user?: string;
  _directory?: string;
}
