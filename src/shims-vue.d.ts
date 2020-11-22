declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface HeroType {
  lastName: string;
  firstName: string;
  courtesyName: string;
  camp: string;
  command: number;
  led: number;
  valor: number;
  force: number;
  tactic: number;
  strategy: number;
  [key: string]: any;
}
