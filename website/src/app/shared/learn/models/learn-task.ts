export class LearnTask {
  currentLearnTaskId: string;
  learnTasksIds: string[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
