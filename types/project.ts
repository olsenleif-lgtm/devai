export interface Project {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

export const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "My First Project", slug: "my-first-project", owned: true },
  { id: "2", name: "API Architecture", slug: "api-architecture", owned: true },
  { id: "3", name: "Shared Design", slug: "shared-design", owned: false },
];
