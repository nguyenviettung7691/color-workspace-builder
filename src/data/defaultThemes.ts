import type { Theme } from '@/types'

export const defaultThemes: Theme[] = [
  {
    id: 'dracula',
    name: 'Dracula',
    colors: ['#ff79c6', '#50fa7b', '#f1fa8c', '#bd93f9', '#6272a4', '#ff5555'],
    isDefault: true,
  },
  {
    id: 'one-dark',
    name: 'One Dark',
    colors: ['#c678dd', '#61afef', '#98c379', '#d19a66', '#5c6370', '#e06c75'],
    isDefault: true,
  },
  {
    id: 'vscode',
    name: 'VSCode',
    colors: ['#569cd6', '#dcdcaa', '#ce9178', '#b5cea8', '#6a9955', '#4ec9b0'],
    isDefault: true,
  },
]
