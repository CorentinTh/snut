import Database from 'better-sqlite3';

const db = new Database('db.sqlite');

db.exec('CREATE TABLE IF NOT EXISTS entries (id TEXT PRIMARY KEY, content TEXT, created_at INTEGER);');

interface DBConnector {
  create(args: { id: string; content: string }): void;
  get(args: { id: string }): { content: string };
}

const connector: DBConnector = {
  create({ id, content }) {
    db.prepare('INSERT INTO entries (id, content, created_at) VALUES (?, ?, ?)').run(id, content, Date.now());
  },
  get({ id }) {
    const content = db.prepare('SELECT content FROM entries where id=?').get(id)?.content;

    return { content };
  },
};

export default connector;
