import {SignModel} from '../../signs/models/sign.model';
import {SignDetailsModel} from '../../signs/models/sign-details.model';

export class LearnSubTask {
  question: SignDetailsModel;
  optionalAnswers: SignModel[];
  responses: SignModel[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
