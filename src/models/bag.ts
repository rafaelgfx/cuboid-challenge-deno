import { BaseModel, Column, DataType, HasMany, Model, Primary } from '/deps/cotton.ts';
import Cuboid from '/src/models/cuboid.ts';

@Model('bags')
class Bag extends BaseModel {
  @Primary()
  id!: number;

  @Column({ type: DataType.Number })
  volume!: number;

  @Column({ type: DataType.String })
  title!: string;

  @HasMany(() => Cuboid, 'bag_id')
  cuboids!: Cuboid[];

  payloadVolume!: number;

  availableVolume!: number;
}

export default Bag;
