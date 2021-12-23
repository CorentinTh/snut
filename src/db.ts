import Database from 'better-sqlite3';
import { config } from './config';

const db = new Database(config.get('db.path'));

db.exec('CREATE TABLE IF NOT EXISTS entries (id TEXT PRIMARY KEY, content TEXT, created_at INTEGER);');

interface DBConnector {
  create(args: { id: string; content: string }): void;
  get(args: { id: string }): { content: string };
  clearOutdated(): void;
}

const connector: DBConnector = {
  create({ id, content }) {
    db.prepare('INSERT INTO entries (id, content, created_at) VALUES (?, ?, ?)').run(id, content, Date.now());
  },
  get({ id }) {
    const content = db.prepare('SELECT content FROM entries where id=?').get(id)?.content;

    return { content };
  },
  clearOutdated() {
    const r = db.prepare('DELETE FROM entries WHERE created_at < ?').run(Date.now() - config.get('millisBeforeOutdated'));
    console.log({ r });
  },
};

export default connector;
