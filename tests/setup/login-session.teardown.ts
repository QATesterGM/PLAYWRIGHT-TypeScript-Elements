import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { Logger } from 'tslog';
import { ADMIN_LOGIN_SESSION, USER_LOGIN_SESSION } from '../../playwright.config';

teardown('cleanup login session', () => {
  const log = new Logger();
  log.info('🚀 TEARDOWN FUNCTION');

  // Clean up the storage state files
  const adminSessionPath = path.resolve(__dirname, ADMIN_LOGIN_SESSION);
  const userSessionPath = path.resolve(__dirname, USER_LOGIN_SESSION);

  if (fs.existsSync(adminSessionPath)) {
    fs.unlinkSync(adminSessionPath);
    log.info('👍 ADMIN_LOGIN_SESSION DELETED!');
  }
  if (fs.existsSync(userSessionPath)) {
    fs.unlinkSync(userSessionPath);
    log.info('👍 USER_LOGIN_SESSION DELETED!');
  }
});
