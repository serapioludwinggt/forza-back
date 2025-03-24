import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger {
  log(message: string, context?: string) {
    super.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
  }

  debug(message: string, context?: string) {
    super.debug?.(message, context); // Optional, depending on config
  }

  verbose(message: string, context?: string) {
    super.verbose?.(message, context);
  }
}
