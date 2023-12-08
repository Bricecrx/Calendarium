import { TestBed } from '@angular/core/testing';

import { ImageGestionService } from './image-gestion.service';

describe('ImageGestionService', () => {
  let service: ImageGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
