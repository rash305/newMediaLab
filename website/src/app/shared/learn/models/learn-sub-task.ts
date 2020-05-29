import {SignModel} from '../../signs/models/sign.model';
import {SignDetailsModel} from '../../signs/models/sign-details.model';

export class LearnSubTask {
  question: SignDetailsModel;
  optionalAnswers: SignModel[];
  correctResponseIDs: string[] = [];
  wrongResponseIDs: string[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  addCorrectResponse(signID: string) {
    this.correctResponseIDs.push(signID);
  }

  addWrongResponse(signID: string) {
    this.wrongResponseIDs.push(signID);
  }
}
