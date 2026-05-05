import { RuledLines } from './components/RuledLines';
import { Content } from './components/Content';

export const NotFoundPage = () => {
  return (
    <main className="bg-background relative flex min-w-150 flex-col items-center justify-center overflow-hidden px-8 py-12">
      <RuledLines />
      <Content />
    </main>
  );
};
