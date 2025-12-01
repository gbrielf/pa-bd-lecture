import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona para /kanban, equivalente ao comportamento do Angular
  redirect('/kanban');
}
