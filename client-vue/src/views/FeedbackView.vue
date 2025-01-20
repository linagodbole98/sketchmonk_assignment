<template>
  <div class="p-4 md:p-6">
    <h1 class="text-2xl font-bold mb-6">Feedback</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="submitFeedback" class="space-y-6">
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            v-model="feedback.subject"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter feedback subject"
          />
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            v-model="feedback.message"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your feedback message"
          ></textarea>
        </div>

        <div>
          <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
          <select
            id="rating"
            v-model="feedback.rating"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface FeedbackForm {
  subject: string
  message: string
  rating: number | ''
}

const feedback = reactive<FeedbackForm>({
  subject: '',
  message: '',
  rating: ''
})

const submitFeedback = () => {
  // Here you would typically send the feedback to your backend
  console.log('Feedback submitted:', feedback)
  // Reset form after submission
  feedback.subject = ''
  feedback.message = ''
  feedback.rating = ''
}
</script>
