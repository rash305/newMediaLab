import {LearnSubTask} from './learn-sub-task';

export class LearnTask {
  currentLearnTaskIndex = 0;
  learnTasks: LearnSubTask[];

  deserialize(input: any): this {
    Object.assign(this, input);
    for (let i = 0; i < this.learnTasks.length; i++) {
      this.learnTasks[i] = new LearnSubTask().deserialize(this.learnTasks[i]);
    }
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
