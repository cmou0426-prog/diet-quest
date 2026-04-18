'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function addMeal(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  // Fetch the most recent quest to get the quest_id
  const { data: quest, error: questError } = await supabase
    .from("quests")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (questError || !quest) {
    throw new Error('No active quest found to link this meal to.')
  }

  const meal_name = formData.get('meal_name') as string
  const calories = parseInt(formData.get('calories') as string)

  if (!meal_name || isNaN(calories)) {
    throw new Error('Invalid input')
  }

  const { error } = await supabase.from('daily_logs').insert([
    {
      user_id: user.id,
      quest_id: quest.id,
      meal_name,
      calories,
    },
  ])

  if (error) {
    console.error('Error adding meal:', error)
    throw new Error('Failed to log meal')
  }

  revalidatePath('/')
}
