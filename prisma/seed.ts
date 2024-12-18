import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
  },
  {
    username: 'user',
    // use your own email here
    email: 'hello@road-to-next.com',
  },
];

const tickets = [
  {
    title: "Mnahn' sll'ha fhtagn.",
    content:
      "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn. Dagon ehye h'throd h'vulgtm, uln f'ehye ron vulgtlagln goka sll'ha y-shtunggli r'luh Hastur, Nyarlathotepoth sll'ha ph'n'ghft bug ah Dagon throd nageb. Ep geb R'lyeh hrii f'syha'h k'yarnak ftaghu Dagon goka, tharanak y'hah h'Hastur vulgtlagln naflftaghu nnnron naflvulgtlagln, uaaah bugog ilyaa gof'nn goka gof'nn orr'eagl. Nilgh'ri Shub-Niggurath mg nogagl f'kn'a vulgtlagln Chaugnar Faugn wgah'n hafh'drnyar, Tsathoggua ebunma ph'nw fhtagn geb hlirghoth fm'latgh y-Yoggoth ooboshu, 'ai kn'a wgah'n Nyarlathotep stell'bsna hrii tharanak. Ph'athg ee r'luh ch'agl goka vulgtlaglnog ngah ph''ai n'gha, orr'e nagnaiih li'hee sll'haor nwyar r'luh sgn'wahl vulgtm, nog 'aiyar ch' chtenff h'lw'nafh k'yarnak geb.",
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: "R'lyeh hafh'drn orr'e, h'syha'h.",
    content:
      "Ilyaa y-ch' hafh'drn R'lyeh llll nnnmnahn' zhro ngilyaa, ftaghu hlirgh lloig nw f'bug ngtharanak, 'fhalma nw naflilyaa hrii Chaugnar Faugn ah.",
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 299,
  },
  {
    title: "Ee uh'e fm'latgh.",
    content:
      "Y'hah s'uhn geb Azathoth ngDagon kn'a, ah ch' mnahn'yar goka nnnnilgh'ri ilyaa, y-kn'a grah'n shogg hai.",
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('DB Seed: Started ...');

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hash('useruser');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
