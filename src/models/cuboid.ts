import { BaseModel, BelongsTo, Column, DataType, Model, Primary } from '/deps/cotton.ts';
import Bag from "/src/models/bag.ts";

@Model('cuboids')
class Cuboid extends BaseModel {
  @Primary()
  id!: number;

  @Column({ type: DataType.Number })
  width!: number;

  @Column({ type: DataType.Number })
  height!: number;

  @Column({ type: DataType.Number })
  depth!: number;

  @BelongsTo(() => Bag, 'bag_id')
  bag!: Bag;

  volume!: number;
}

export default Cuboid;
