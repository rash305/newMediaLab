import {LearnSubTask} from './learn-sub-task';

export class LearnTask {
  currentLearnTaskIndex: string;
  learnTasks: LearnSubTask[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
