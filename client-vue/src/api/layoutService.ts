import axios from 'axios'
import type { ApiResponse, SaveLayoutRequest, GetLayoutsResponse, GetLayoutResponse, DeleteLayoutRequest, UpdateLayoutRequest } from '../types/api'
import type { DashboardLayout } from '../types/widgets'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const layoutService = {
  async getLayouts(): Promise<ApiResponse<GetLayoutsResponse>> {
    try {
      const response = await api.get<ApiResponse<GetLayoutsResponse>>('/layouts')
      return response.data
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch layouts'
      }
    }
  },

  async getLayout(layoutId: string): Promise<ApiResponse<GetLayoutResponse>> {
    try {
      const response = await api.get<ApiResponse<GetLayoutResponse>>(`/layouts/${layoutId}`)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch layout'
      }
    }
  },

  async saveLayout(layout: DashboardLayout): Promise<ApiResponse<void>> {
    try {
      const response = await api.post<ApiResponse<void>>('/layouts', { layout } as SaveLayoutRequest)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save layout'
      }
    }
  },

  async updateLayout(layoutId: string, layout: DashboardLayout): Promise<ApiResponse<void>> {
    try {
      const response = await api.put<ApiResponse<void>>(`/layouts/${layoutId}`, {
        layoutId,
        layout
      } as UpdateLayoutRequest)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update layout'
      }
    }
  },

  async deleteLayout(layoutId: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete<ApiResponse<void>>(`/layouts/${layoutId}`)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete layout'
      }
    }
  }
}
