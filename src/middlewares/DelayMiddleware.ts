import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    setTimeout(() => {
      next();
    }, 1000);
  }
}
