export class Article {
  Id: string;
  Title: string;
  image: string;
  Value: string;
  PublishAt: Date;
  Description: string;
  Category: string;
  HexColor: string;
  constructor(
    Id: string,
    Title: string,
    image: string,
    Value: string,
    PublishAt: Date,
    Description: string,
    Category: string,
    HexColor: string
  ) {
    this.Id = Id;
    this.Title = Title;
    this.image = image;
    this.Value = Value;
    this.PublishAt = PublishAt;
    this.Description = Description;
    this.Category = Category;
    this.HexColor = HexColor;
  }
}
