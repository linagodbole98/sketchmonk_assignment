<template>
  <div class="p-4 md:p-6">
    <h1 class="text-2xl font-bold mb-6">Help Center</h1>
    
    <!-- Search Bar -->
    <div class="mb-8">
      <div class="relative">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search help articles..."
          class="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <svg 
          class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Help Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in filteredCategories" :key="category.title" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <h2 class="text-lg font-semibold mb-4">{{ category.title }}</h2>
        <ul class="space-y-3">
          <li v-for="article in category.articles" :key="article.title" class="text-gray-600 hover:text-indigo-600">
            <a href="#" @click.prevent="showArticle(article)" class="flex items-center">
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              {{ article.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Article Modal -->
    <div v-if="selectedArticle" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-bold">{{ selectedArticle.title }}</h2>
            <button @click="selectedArticle = null" class="text-gray-500 hover:text-gray-700">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="prose max-w-none" v-html="selectedArticle.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Article {
  title: string
  content: string
}

interface Category {
  title: string
  articles: Article[]
}

const searchQuery = ref('')
const selectedArticle = ref<Article | null>(null)

const categories: Category[] = [
  {
    title: 'Getting Started',
    articles: [
      {
        title: 'Quick Start Guide',
        content: `
          <h3>Welcome to our platform!</h3>
          <p>Follow these steps to get started:</p>
          <ol>
            <li>Set up your profile</li>
            <li>Configure your dashboard</li>
            <li>Connect your data sources</li>
            <li>Start analyzing your data</li>
          </ol>
        `
      },
      {
        title: 'Dashboard Overview',
        content: 'Learn how to navigate and customize your dashboard...'
      },
      {
        title: 'Account Settings',
        content: 'Manage your account preferences and security settings...'
      }
    ]
  },
  {
    title: 'Features & Tools',
    articles: [
      {
        title: 'Data Analytics',
        content: 'Understand how to use our analytics tools...'
      },
      {
        title: 'Report Generation',
        content: 'Learn how to create and customize reports...'
      },
      {
        title: 'Data Export',
        content: 'Export your data in various formats...'
      }
    ]
  },
  {
    title: 'Troubleshooting',
    articles: [
      {
        title: 'Common Issues',
        content: 'Solutions to frequently encountered problems...'
      },
      {
        title: 'Error Messages',
        content: 'Understanding error messages and how to resolve them...'
      },
      {
        title: 'Contact Support',
        content: 'Get in touch with our support team...'
      }
    ]
  }
]

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories
  
  return categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })).filter(category => category.articles.length > 0)
})

const showArticle = (article: Article) => {
  selectedArticle.value = article
}
</script>
