import { Database } from "./db";

export async function seedDatabase(db: Database) {
  const group1 = await db.groups.save({
    id: "group1",
    name: "Group 1",
  });
  const group2 = await db.groups.save({
    id: "group2",
    name: "Group 2",
  });

  // John Doe
  db.users.save({
    id: "7b4870a5ea985d422b73e98b13468b5a1211fe282f6a86feb37c220007ce9000",
    groupIds: [group1.id, group2.id],
  });
  // Mary Jane
  db.users.save({
    id: "6a89e189a2bfd1929f3f38800ac51dd861167a3bd03f4c45da8e2909bdb457b9",
    groupIds: [group2.id],
  });
}
