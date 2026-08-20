import { supabase } from './supabaseClient'

export async function getResumeVersions() {
  const { data, error } = await supabase
    .from('resume_versions')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function addResumeVersion(name, userId) {
  const { data, error } = await supabase
    .from('resume_versions')
    .insert([{ name, user_id: userId }])
    .select()
  return { data, error }
}

export async function updateResumeVersion(id, name) {
  const { data, error } = await supabase
    .from('resume_versions')
    .update({ name })
    .eq('id', id)
    .select()
  return { data, error }
}

export async function deleteResumeVersion(id) {
  const { data, error } = await supabase
    .from('resume_versions')
    .delete()
    .eq('id', id)
  return { data, error }
}