import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { pair, pairWithMatches } from '../components/pairs';

const DEVS = [
  'María',
  'Pablo Pareja',
  'Andrés González',
  'Javi Abia',
  'David Inga',
  'Tomas Eriksson',
  'Miguel Barrenechea',
  'Alvaro',
  'Clément'
];

const EXISTING_PAIRS = [
  ['María', 'Daniel Fernandez'],
  ['Pablo Pareja', 'Andrés González'],
  ['Javi Abia', 'David Inga'],
  ['Tomas Eriksson', 'Miguel Barrenechea'],
  ['Alvaro', 'Clément'],
  ['María', 'Andrés González'],
  ['Daniel Fernandez', 'Javi Abia'],
  ['Pablo Pareja', 'Tomas Eriksson'],
  ['David Inga', 'Alvaro'],
  ['Miguel Barrenechea', 'Clément'],
  ['María', 'Javi Abia'],
  ['Daniel Fernandez', 'Andrés González'],
  ['Pablo Pareja', 'Miguel Barrenechea'],
  ['David Inga', 'Clément'],
  ['Tomas Eriksson', 'Alvaro'],
  ['María', 'Pablo Pareja', 'David Inga'],
  ['Andrés González', 'Javi Abia'],
  ['Tomas Eriksson', 'Clément'],
  ['Miguel Barrenechea', 'Alvaro'],
  ['María', 'Alvaro', 'Clément'],
  ['Pablo Pareja', 'Javi Abia'],
  ['Andrés González', 'Miguel Barrenechea'],
  ['David Inga', 'Tomas Eriksson']
];

const pairs = pair(DEVS, EXISTING_PAIRS);
const pairsWithMatch = pairWithMatches(DEVS, EXISTING_PAIRS);

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Vizzualiy Pairs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Vizzuality Pairs
        </h1>

        <p className={styles.description}>
          This week pairs
          {pairs && pairs[0] && pairs?.map((dev) => (
            <div>{dev.join(', ')}</div>
          ))}
        </p>
        <p className={styles.description}>
          {pairsWithMatch?.map((pair) => (
            <>
              <>
                <div className={styles.description}>
                  Hi <span className={styles.bold}>{pair.dev1}</span>,
                </div>
                <div>Your pair this week is: {pair.dev2}, {pair.dev3}</div>
                <div>Your common interests are:</div>
                <div className={styles.code}>
                  {pair.commonInterests.map((i) => (
                    <div>{i}</div>
                  ))}
                </div>
              </>
              <>
                <div className={styles.description}>
                  Hi <span className={styles.bold}>{pair.dev2}</span>,
                </div>
                <div>Your pair this week is: {pair.dev1}, {pair.dev3},</div>
                <div>Your common interests are:</div>
                <div className={styles.code}>
                  {pair.commonInterests.map((i) => (
                    <div>{i}</div>
                  ))}
                </div>
              </>
              {pair.dev3 && <>
                <div className={styles.description}>
                  Hi <span className={styles.bold}>{pair.dev3}</span>,
                </div>
                <div>Your pair this week is: {pair.dev1}, {pair.dev2},</div>
                <div>Your common interests are:</div>
                <div className={styles.code}>
                  {pair.commonInterests.map((i) => (
                    <div>{i}</div>
                  ))}
                </div>
              </>}
            </>
          ))}
        </p>
      </main>
    </div>
  );
}
