import type { DashboardLayout } from './widgets'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface SaveLayoutRequest {
  layout: DashboardLayout
}

export interface GetLayoutsResponse {
  layouts: DashboardLayout[]
}

export interface GetLayoutResponse {
  layout: DashboardLayout
}

export interface DeleteLayoutRequest {
  layoutId: string
}

export interface UpdateLayoutRequest {
  layoutId: string
  layout: DashboardLayout
}
