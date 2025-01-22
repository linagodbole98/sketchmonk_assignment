<template>
  <div class="p-4 md:p-6 max-w-[1600px] mx-auto bg-[#F8F9FA]">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800">Overview</h1>
      <div class="flex gap-2 w-full sm:w-auto">
        <button class="flex-1 sm:flex-none px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 text-sm font-medium">
          Filter
        </button>
        <button class="flex-1 sm:flex-none px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 text-sm font-medium">
          Share
        </button>
      </div>
    </div>

    <div class="space-y-6">
      <OverviewStats />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Over Time">
          <RevenueChart />
        </Card>

        <Card title="Session by Country">
          <div class="space-y-4">
            <template v-if="dashboardData.sessionsByCountry.length > 0">
              <div
                v-for="session in dashboardData.sessionsByCountry"
                :key="session.country"
                class="flex items-center gap-2"
              >
                <div class="w-24 sm:w-32 text-sm text-gray-700">{{ session.country }}</div>
                <div class="flex-1">
                  <div class="h-2 bg-gray-100 rounded-full">
                    <div
                      class="h-2 bg-[#287F71] rounded-full transition-all"
                      :style="{ width: `${session.percentage}%` }"
                    />
                  </div>
                </div>
                <div class="w-16 text-right text-sm text-gray-600">{{ session.value }}</div>
                <div class="w-16 text-right text-sm text-gray-600">{{ session.percentage }}%</div>
              </div>
            </template>
            <NoData v-else message="No session data available" />
          </div>
        </Card>

        <Card title="Sales by Region">
          <div class="h-[300px]">
            <SalesRegionChart v-if="dashboardData.salesByRegion.values.some(value => value > 0)" />
            <NoData v-else message="No sales data available" />
          </div>
        </Card>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card title="Sales by Platform">
            <div class="h-[300px]">
              <EcommercePlatformChart
                v-if="dashboardData.ecommercePlatform.some(item => item.percentage > 0)"
              />
              <NoData v-else message="No platform data available" />
            </div>
          </Card>

          <Card title="Registered Users">
            <div class="h-[300px]">
              <UsersGaugeChart v-if="dashboardData.registeredUsers.total > 0" />
              <NoData v-else message="No user data available" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OverviewStats from './OverviewStats.vue'
import RevenueChart from './charts/RevenueChart.vue'
import SalesRegionChart from './charts/SalesRegionChart.vue'
import EcommercePlatformChart from './charts/EcommercePlatformChart.vue'
import UsersGaugeChart from './charts/UsersGaugeChart.vue'
import { dashboardData } from '../constants/dashboardData'
import NoData from './NoData.vue'
import Card from './Card.vue'
</script>
