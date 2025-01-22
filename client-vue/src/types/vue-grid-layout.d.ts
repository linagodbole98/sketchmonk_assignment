declare module 'vue-grid-layout' {
  import { DefineComponent } from 'vue'

  export interface GridItemData {
    x: number
    y: number
    w: number
    h: number
    i: string
    minW?: number
    maxW?: number
    minH?: number
    maxH?: number
    moved?: boolean
    static?: boolean
    isDraggable?: boolean
    isResizable?: boolean
  }

  export interface GridLayoutProps {
    layout: GridItemData[]
    colNum?: number
    rowHeight?: number
    maxRows?: number
    margin?: [number, number]
    isDraggable?: boolean
    isResizable?: boolean
    isMirrored?: boolean
    autoSize?: boolean
    verticalCompact?: boolean
    preventCollision?: boolean
    useCssTransforms?: boolean
    responsive?: boolean
    breakpoints?: { [key: string]: number }
    cols?: { [key: string]: number }
    useStyleCursor?: boolean
  }

  export const GridLayout: DefineComponent<GridLayoutProps>
  export const GridItem: DefineComponent<GridItemData>
}
