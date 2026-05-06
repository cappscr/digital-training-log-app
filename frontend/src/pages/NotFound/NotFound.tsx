import { RuledLines } from './components/RuledLines';
import { Content } from './components/Content';
import { Folio } from './components/Folio';

export const NotFoundPage = () => {
  return (
    <main className="bg-background relative flex h-dvh min-h-150 flex-col items-center justify-center overflow-hidden px-8 py-12">
      <RuledLines />
      <Content />
      <Folio />
    </main>
  );
};
