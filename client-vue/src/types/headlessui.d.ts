declare module '@headlessui/vue' {
  import { DefineComponent } from 'vue'

  export const Switch: DefineComponent<{
    modelValue?: boolean
    as?: string | object
    class?: string | object | any[]
    disabled?: boolean
  }>

  export const Menu: DefineComponent<{
    as?: string | object
  }>

  export const MenuButton: DefineComponent<{
    as?: string | object
    disabled?: boolean
  }>

  export const MenuItems: DefineComponent<{
    as?: string | object
    static?: boolean
  }>

  export const MenuItem: DefineComponent<{
    as?: string | object
    disabled?: boolean
  }>
}
