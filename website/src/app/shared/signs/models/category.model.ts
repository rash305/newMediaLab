import {ISignTemplate} from './isign-template';

export class CategoryModel implements ISignTemplate {

  title: string;
  id: string;

  deserialize(input: any): CategoryModel {
    Object.assign(this, input);
    return this;
  }

}
