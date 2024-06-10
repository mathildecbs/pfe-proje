import { Album } from "./AlbumType";
import { Group } from "./GroupType";
import { Inclusion } from "./InclusionType";

export interface Artist {
  id: number;
  create_date: string;
  maj_date: string;
  name: string;
  birthday: string;
  // image: string;
  albums: Album[];
  inclusions: Inclusion[];
  mainGroup: Group;
  groups: Group[];
}
