import {ISignTemplate} from './isign-template';
import {SignDetailsComponent} from '../../../modules/dictionary/sign-details/sign-details.component';
import {SignModel} from './sign.model';

export class SignDetailsModel extends SignModel {
  video: string;
  image: string;
  category: string;
}
