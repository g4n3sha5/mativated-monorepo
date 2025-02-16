import { Prisma, PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import * as path from 'node:path';

const prisma = new PrismaClient();

type SeedTechnique = Pick<Prisma.TechniqueCreateInput, 'name' | 'description' | 'type' | 'videoUrl'> & {
  tags: string[];
};

async function main() {
  const techniques: SeedTechnique[] = JSON.parse(
    readFileSync(path.join(process.cwd(), 'src/data/techniques.json'), 'utf-8')
  );
  const tags: string[] = JSON.parse(readFileSync(path.join(process.cwd(), 'src/data/tags.json'), 'utf-8'));

  await prisma.tag.createMany({
    data: tags.map((name) => ({ name })),
    skipDuplicates: true,
  });
  for (const technique of techniques) {
    await prisma.technique.create({
      data: {
        name: technique.name,
        type: technique.type,
        description: technique.description,
        tags: {
          connectOrCreate: technique.tags.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
