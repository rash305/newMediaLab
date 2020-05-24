import {ISignTemplate} from './isign-template';
import {CategoryModel} from './category.model';

export class SignModel implements ISignTemplate {
  id: string;
  title: string;
  category: CategoryModel;

  constructor() {
    }

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
