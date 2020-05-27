import {SignModel} from '../../signs/models/sign.model';
import {SignDetailsModel} from '../../signs/models/sign-details.model';

export class LearnSubTask {
  question: SignDetailsModel;
  optionalAnswers: SignModel[];
  correctResponses: SignModel[] = [];
  wrongResponses: SignModel[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  addCorrectResponse(sign: SignModel) {
    this.correctResponses.push(sign);
  }

  addWrongResponse(sign: SignModel) {
    this.wrongResponses.push(sign);
  }
}
