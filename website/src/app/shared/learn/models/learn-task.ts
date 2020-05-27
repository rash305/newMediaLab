import {LearnSubTask} from './learn-sub-task';

export class LearnTask {
  currentLearnTaskIndex: number;
  learnTasks: LearnSubTask[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  getCurrentLearnTask() {
    return this.learnTasks[this.currentLearnTaskIndex];
  }

  getLearnedSigns() {
    const learnedSigns = [];
    for (const learnSubTask of this.learnTasks) {
      learnedSigns.push(learnSubTask.question);
    }
    return learnedSigns;
  }
}
