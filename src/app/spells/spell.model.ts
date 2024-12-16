export class Spell {
  public _id: string;
  public name: string;
  public description: string;
  public range: string;
  public components: string;
  public ritual: boolean;
  public duration: string;
  public concentration: boolean;
  public castingTime: string;
  public level: number;
  public school: string;
  public damage: string;

  constructor(
    _id: string|null,
    name: string,
    description: string,
    range: string,
    components: string|null,
    ritual: boolean,
    duration: string,
    concentration: boolean,
    castingTime: string,
    level: number,
    school: string,
    damage: string|null
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.range = range;
    this.components = components;
    this.ritual = ritual;
    this.duration = duration;
    this.concentration = concentration;
    this.castingTime = castingTime;
    this.level = level;
    this.school = school;
    this.damage = damage;
  }
}