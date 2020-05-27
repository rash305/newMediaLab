import {SignModel} from '../../signs/models/sign.model';

export class LearnSubTask {
  question: SignModel;
  optionalAnswers: SignModel[];
  responses: SignModel[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
