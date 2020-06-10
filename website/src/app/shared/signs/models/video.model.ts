export class VideoModel {
  public id;
  public videoUrl;
  public type;
  public popularity: number;

  constructor() {
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  getUrl(): string {
    return this.videoUrl + '?type=' + this.type;
  }
}
