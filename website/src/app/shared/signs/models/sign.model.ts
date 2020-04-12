import {ISignTemplate} from './isign-template';

export class SignModel implements ISignTemplate {
  id: string;
  title: string;
  categoryId: string;

  constructor(id: string, title: string, categoryId: string) {
    this.id = id;
    this.title = title;
    this.categoryId = categoryId;
  }
}
