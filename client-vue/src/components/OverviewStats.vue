<template>
  <div v-if="isLoading">Loading...</div>
  <NoData v-else-if="error || !dashboardData" message="Error loading overview stats" />
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
    <StatCard
      title="Total Income"
      :value="dashboardData.overview.totalIncome.value"
      :percentage-change="dashboardData.overview.totalIncome.percentageChange"
      :trend="dashboardData.overview.totalIncome.trend"
      format="currency"
    />
    <StatCard
      title="Profit"
      :value="dashboardData.overview.profit.value"
      :percentage-change="dashboardData.overview.profit.percentageChange"
      :trend="dashboardData.overview.profit.trend"
      format="currency"
    />
    <StatCard
      title="Total Views"
      :value="dashboardData.overview.totalViews.value"
      :percentage-change="dashboardData.overview.totalViews.percentageChange"
      :trend="dashboardData.overview.totalViews.trend"
    />
    <StatCard
      title="Conversion Rate"
      :value="dashboardData.overview.conversionRate.value"
      :percentage-change="dashboardData.overview.conversionRate.percentageChange"
      :trend="dashboardData.overview.conversionRate.trend"
      format="percentage"
    />
  </div>
</template>

<script setup lang="ts">
import { useDashboardData } from '../api/queries'
import NoData from './NoData.vue'
import StatCard from './StatCard.vue'

const { data: dashboardData, isLoading, error } = useDashboardData()
</script>
