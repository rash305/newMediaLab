import { TestBed } from '@angular/core/testing';

import { SignTemplateStoreService } from './sign-template-store.service';

describe('SignTemplateStoreService', () => {
  let service: SignTemplateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignTemplateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
