export class MagicItem {
  public _id: string;
  public name: string;
  public category: string;
  public type: string;
  public rarity: string;
  public description: string;
  public attunement: boolean;

  constructor(
    _id: string|null,
    name: string,
    category: string,
    type: string,
    rarity: string,
    description: string,
    attunement: boolean
  ) {
    this._id = _id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.rarity = rarity;
    this.description = description;
    this.attunement = attunement;
  }
}