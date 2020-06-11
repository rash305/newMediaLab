import {SignModel} from '../../signs/models/sign.model';
import {SignDetailsModel} from '../../signs/models/sign-details.model';

export class LearnSubTask {
  question: SignDetailsModel;
  optionalAnswers: SignModel[];
  correctResponseIDs: string[] = [];
  wrongResponseIDs: string[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.question) {
      this.question = new SignDetailsModel().deserialize(input.question);
    }
    if (input.optionalAnswers) {
      this.optionalAnswers = input.optionalAnswers.map(answer => new SignModel().deserialize(answer));
    }
    return this;
  }

  addCorrectResponse(signID: string) {
    this.correctResponseIDs.push(signID);
  }

  addWrongResponse(signID: string) {
    this.wrongResponseIDs.push(signID);
  }
}
