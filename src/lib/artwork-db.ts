import Database from "better-sqlite3";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { ArtworkFormPayload, ArtworkItem, ArtworkStatus } from "@/types/artwork";

type ArtworkRow = {
  id: number;
  public_code: string;
  title: string;
  artist: string;
  edition: string;
  year: string;
  url: string;
  status: ArtworkStatus;
  created_at: string;
  updated_at: string;
};

type TableColumn = {
  name: string;
  type: string;
};

type SeedArtworkItem = {
  title: string;
  artist: string;
  edition: string;
  year: string;
  url: string;
  status: ArtworkStatus;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "admin.sqlite");
const backupPath = path.join(dataDir, "artworks.backup.json");
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
const PUBLIC_CODE_LENGTH = 8;

function buildArtworkUrl(publicCode: string) {
  return `/cert-art?code=${publicCode}`;
}

const seedItems: SeedArtworkItem[] = [
  {
    title: "Wednesday - Knifmare",
    artist: "Heri Dono",
    edition: "1/7",
    year: "2026",
    url: "/cert-art?code=1",
    status: "Published",
  },
  {
    title: "Blue Field Notes",
    artist: "Ykha Amelz",
    edition: "3/12",
    year: "2025",
    url: "/cert-art?code=2",
    status: "Draft",
  },
  {
    title: "Quiet Surface",
    artist: "Indieguerillas",
    edition: "2/10",
    year: "2025",
    url: "/cert-art?code=3",
    status: "Published",
  },
  {
    title: "Echoes of Stone",
    artist: "Tromarama",
    edition: "5/9",
    year: "2024",
    url: "/cert-art?code=4",
    status: "Draft",
  },
  {
    title: "Silent River",
    artist: "Eko Nugroho",
    edition: "4/11",
    year: "2025",
    url: "/cert-art?code=5",
    status: "Published",
  },
  {
    title: "Red Horizon",
    artist: "Entang Wiharso",
    edition: "2/8",
    year: "2026",
    url: "/cert-art?code=6",
    status: "Draft",
  },
  {
    title: "Paper Memory",
    artist: "Agan Harahap",
    edition: "6/15",
    year: "2025",
    url: "/cert-art?code=7",
    status: "Published",
  },
  {
    title: "Urban Bloom",
    artist: "S. Teddy D",
    edition: "1/5",
    year: "2024",
    url: "/cert-art?code=8",
    status: "Draft",
  },
  {
    title: "Still Night",
    artist: "Arahmaiani",
    edition: "3/6",
    year: "2026",
    url: "/cert-art?code=9",
    status: "Published",
  },
  {
    title: "Golden Ash",
    artist: "Mella Jaarsma",
    edition: "2/7",
    year: "2025",
    url: "/cert-art?code=10",
    status: "Draft",
  },
  {
    title: "Mirror Field",
    artist: "Made Wianta",
    edition: "7/20",
    year: "2024",
    url: "/cert-art?code=11",
    status: "Published",
  },
  {
    title: "Midday Blue",
    artist: "Nindityo Adipurnomo",
    edition: "1/9",
    year: "2026",
    url: "/cert-art?code=12",
    status: "Draft",
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __artworkDb__: Database.Database | undefined;
}

function ensureDataDir() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

function mapRow(row: ArtworkRow): ArtworkItem {
  return {
    id: Number(row.id),
    publicCode: row.public_code,
    title: row.title,
    artist: row.artist,
    edition: row.edition,
    year: row.year,
    url: row.url,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function generatePublicCode() {
  let code = "";

  while (code.length < PUBLIC_CODE_LENGTH) {
    const bytes = randomBytes(PUBLIC_CODE_LENGTH);
    for (let index = 0; index < bytes.length; index += 1) {
      const byte = bytes[index];
      if (code.length >= PUBLIC_CODE_LENGTH) {
        break;
      }

      code += CODE_ALPHABET[byte % CODE_ALPHABET.length];
    }
  }

  return code;
}

function generateUniquePublicCode(db: Database.Database) {
  const existing = db.prepare("SELECT id FROM artworks WHERE public_code = ? LIMIT 1");

  while (true) {
    const code = generatePublicCode();
    const match = existing.get(code) as { id: number } | undefined;

    if (!match) {
      return code;
    }
  }
}

function getAllArtworkRows(db: Database.Database) {
  return db
    .prepare("SELECT * FROM artworks ORDER BY datetime(created_at) DESC, id DESC")
    .all() as ArtworkRow[];
}

function syncArtworkBackup(db: Database.Database) {
  const items = getAllArtworkRows(db).map(mapRow);

  writeFileSync(
    backupPath,
    JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        total: items.length,
        items,
      },
      null,
      2
    ),
    "utf8"
  );
}

function normalizeArtworkUrls(db: Database.Database) {
  const rows = getAllArtworkRows(db);
  const update = db.prepare(`
    UPDATE artworks
    SET public_code = @public_code,
        url = @url,
        updated_at = @updated_at
    WHERE id = @id
  `);
  const now = new Date().toISOString();

  const transaction = db.transaction(() => {
    for (const row of rows) {
      const nextCode = row.public_code?.trim() || generateUniquePublicCode(db);
      const nextUrl = buildArtworkUrl(nextCode);

      if (row.url !== nextUrl || row.public_code !== nextCode) {
        update.run({
          id: row.id,
          public_code: nextCode,
          url: nextUrl,
          updated_at: now,
        });
      }
    }
  });

  transaction();
}

function ensureArtworkTable(db: Database.Database) {
  const tableExists = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'artworks'")
    .get() as { name: string } | undefined;

  if (!tableExists) {
    db.exec(`
      CREATE TABLE artworks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        public_code TEXT UNIQUE,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        edition TEXT NOT NULL,
        year TEXT NOT NULL,
        url TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('Draft', 'Published')),
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);
    return;
  }

  const columns = db.prepare("PRAGMA table_info(artworks)").all() as TableColumn[];
  const idColumn = columns.find((column) => column.name === "id");
  const hasPublicCode = columns.some((column) => column.name === "public_code");

  if (idColumn?.type.toUpperCase() === "INTEGER" && hasPublicCode) {
    db.exec("CREATE UNIQUE INDEX IF NOT EXISTS artworks_public_code_key ON artworks(public_code)");
    return;
  }

  db.exec(`
    ALTER TABLE artworks RENAME TO artworks_legacy;

    CREATE TABLE artworks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      public_code TEXT UNIQUE,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      edition TEXT NOT NULL,
      year TEXT NOT NULL,
      url TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('Draft', 'Published')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    INSERT INTO artworks (title, artist, edition, year, url, status, created_at, updated_at)
    SELECT title, artist, edition, year, url, status, created_at, updated_at
    FROM artworks_legacy
    ORDER BY datetime(created_at) ASC, rowid ASC;

    DROP TABLE artworks_legacy;
  `);

  db.exec("CREATE UNIQUE INDEX IF NOT EXISTS artworks_public_code_key ON artworks(public_code)");
}

function seedArtworkTable(db: Database.Database) {
  const count = db.prepare("SELECT COUNT(*) as count FROM artworks").get() as { count: number };

  if (count.count > 0) {
    return;
  }

  const insert = db.prepare(`
    INSERT INTO artworks (public_code, title, artist, edition, year, url, status, created_at, updated_at)
    VALUES (@public_code, @title, @artist, @edition, @year, @url, @status, @created_at, @updated_at)
  `);

  const now = new Date().toISOString();
  const transaction = db.transaction(() => {
    for (let index = 0; index < seedItems.length; index += 1) {
      const item = seedItems[index];
      const publicCode = `art${String(index + 1).padStart(5, "0")}`.slice(0, PUBLIC_CODE_LENGTH);
      insert.run({
        ...item,
        public_code: publicCode,
        url: buildArtworkUrl(publicCode),
        created_at: now,
        updated_at: now,
      });
    }
  });

  transaction();
}

function getDb() {
  if (global.__artworkDb__) {
    return global.__artworkDb__;
  }

  ensureDataDir();
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  ensureArtworkTable(db);
  seedArtworkTable(db);
  normalizeArtworkUrls(db);

  if (!existsSync(backupPath)) {
    syncArtworkBackup(db);
  } else {
    syncArtworkBackup(db);
  }

  global.__artworkDb__ = db;
  return db;
}

function validatePayload(payload: Partial<ArtworkFormPayload>): asserts payload is ArtworkFormPayload {
  if (
    !payload.title?.trim() ||
    !payload.artist?.trim() ||
    !payload.edition?.trim() ||
    !payload.year?.trim() ||
    (payload.status !== "Draft" && payload.status !== "Published")
  ) {
    throw new Error("Invalid artwork payload");
  }
}

export function listArtworks(): ArtworkItem[] {
  const db = getDb();
  const rows = getAllArtworkRows(db);

  return rows.map(mapRow);
}

export function getArtworkById(id: number): ArtworkItem | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM artworks WHERE id = ?").get(id) as ArtworkRow | undefined;

  return row ? mapRow(row) : null;
}

export function getArtworkByPublicCode(publicCode: string): ArtworkItem | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM artworks WHERE public_code = ?")
    .get(publicCode) as ArtworkRow | undefined;

  return row ? mapRow(row) : null;
}

export function createArtwork(payload: ArtworkFormPayload): ArtworkItem {
  validatePayload(payload);
  const db = getDb();
  const now = new Date().toISOString();
  const publicCode = generateUniquePublicCode(db);

  const result = db.prepare(`
    INSERT INTO artworks (public_code, title, artist, edition, year, url, status, created_at, updated_at)
    VALUES (@public_code, @title, @artist, @edition, @year, @url, @status, @created_at, @updated_at)
  `).run({
    public_code: publicCode,
    ...payload,
    title: payload.title.trim(),
    artist: payload.artist.trim(),
    edition: payload.edition.trim(),
    year: payload.year.trim(),
    url: buildArtworkUrl(publicCode),
    created_at: now,
    updated_at: now,
  });

  syncArtworkBackup(db);

  const createdId = Number(result.lastInsertRowid);
  const row = db.prepare("SELECT * FROM artworks WHERE id = ?").get(createdId) as ArtworkRow;
  return mapRow(row);
}

export function updateArtwork(id: number, payload: ArtworkFormPayload): ArtworkItem {
  validatePayload(payload);
  const db = getDb();
  const now = new Date().toISOString();
  const existingRow = db.prepare("SELECT public_code FROM artworks WHERE id = ?").get(id) as
    | { public_code: string }
    | undefined;

  if (!existingRow) {
    throw new Error("Artwork not found");
  }

  const result = db.prepare(`
    UPDATE artworks
    SET title = @title,
        artist = @artist,
        edition = @edition,
        year = @year,
        url = @url,
        status = @status,
        updated_at = @updated_at
    WHERE id = @id
  `).run({
    id,
    ...payload,
    title: payload.title.trim(),
    artist: payload.artist.trim(),
    edition: payload.edition.trim(),
    year: payload.year.trim(),
    url: buildArtworkUrl(existingRow.public_code),
    updated_at: now,
  });

  if (result.changes === 0) {
    throw new Error("Artwork not found");
  }

  syncArtworkBackup(db);

  const row = db.prepare("SELECT * FROM artworks WHERE id = ?").get(id) as ArtworkRow;
  return mapRow(row);
}

export function deleteArtwork(id: number) {
  const db = getDb();
  const result = db.prepare("DELETE FROM artworks WHERE id = ?").run(id);

  if (result.changes === 0) {
    throw new Error("Artwork not found");
  }

  syncArtworkBackup(db);
}
