export class FavoriteVideoModel {
  public signId;
  public categoryId;
  public videoId;

  constructor(signId, categoryId, videoId) {
    this.signId = signId;
    this.categoryId = categoryId;
    this.videoId = videoId;
  }
}
