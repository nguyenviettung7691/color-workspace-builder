export interface PaletteColor {
  slug: string
  hex: string
  name: string
}

export interface Palette {
  id: number
  name: string
  slug: string
  colors: PaletteColor[]
}

export type ColorType = 'Key' | 'Func' | 'String' | 'Number' | 'Comment' | 'Tag'

export const COLOR_TYPES: ColorType[] = ['Key', 'Func', 'String', 'Number', 'Comment', 'Tag']

export const MAX_WORKSPACE_COLORS = 6

export interface Theme {
  id: string
  name: string
  colors: string[]
  isDefault: boolean
}
