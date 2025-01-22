<template>
  <div v-if="isLoading">Loading...</div>
  <NoData v-else-if="error || !dashboardData" message="Error loading overview stats" />
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard
      title="Total Income"
      :value="dashboardData.overview.totalIncome.value"
      :percentage-change="dashboardData.overview.totalIncome.percentageChange"
      subtitle="Compared to last month"
    />
    <StatCard
      title="Profit"
      :value="dashboardData.overview.profit.value"
      :percentage-change="dashboardData.overview.profit.percentageChange"
      subtitle="Compared to last month"
    />
    <StatCard
      title="Total Views"
      :value="dashboardData.overview.totalViews.value"
      :percentage-change="dashboardData.overview.totalViews.percentageChange"
      subtitle="Compared to last month"
    />
    <StatCard
      title="Conversion Rate"
      :value="dashboardData.overview.conversionRate.value"
      :percentage-change="dashboardData.overview.conversionRate.percentageChange"
      subtitle="Compared to last month"
    />
  </div>
</template>

<script setup lang="ts">
import { useDashboardData } from '../api/queries'
import NoData from './NoData.vue'
import StatCard from './StatCard.vue'

const { data: dashboardData, isLoading, error } = useDashboardData()
</script>
