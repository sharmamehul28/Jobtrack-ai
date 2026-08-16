import { supabase } from './supabaseClient'

export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function addApplication(applicationData) {
  const { data, error } = await supabase
    .from('applications')
    .insert([applicationData])
    .select()
  return { data, error }
}

export async function updateApplication(id, applicationData) {
  const { data, error } = await supabase
    .from('applications')
    .update(applicationData)
    .eq('id', id)
    .select()
  return { data, error }
}

export async function deleteApplication(id) {
  const { data, error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)
  return { data, error }
}