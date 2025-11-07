import { supabase } from './supabase'

export interface Image {
  id: string
  title: string
  description?: string
  image_url: string
  category?: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Certificate {
  id: string
  title: string
  description?: string
  certificate_url: string
  issued_by?: string
  issued_date?: string
  expiry_date?: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  title: string
  description?: string
  image_url?: string
  achievement_date?: string
  category?: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export const imageApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: false })
    
    if (error) throw error
    return { data: data as Image[] }
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data: data as Image }
  },
  
  create: async (data: Partial<Image>) => {
    const { data: result, error } = await supabase
      .from('images')
      .insert(data)
      .select()
      .single()
    
    if (error) throw error
    return { data: result as Image }
  },
  
  update: async (id: string, data: Partial<Image>) => {
    const { data: result, error } = await supabase
      .from('images')
      .update(data)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return { data: result as Image }
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { data: null }
  },
}

export const certificateApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: false })
    
    if (error) throw error
    return { data: data as Certificate[] }
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data: data as Certificate }
  },
  
  create: async (data: Partial<Certificate>) => {
    const { data: result, error } = await supabase
      .from('certificates')
      .insert(data)
      .select()
      .single()
    
    if (error) throw error
    return { data: result as Certificate }
  },
  
  update: async (id: string, data: Partial<Certificate>) => {
    const { data: result, error } = await supabase
      .from('certificates')
      .update(data)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return { data: result as Certificate }
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { data: null }
  },
}

export const achievementApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: false })
    
    if (error) throw error
    return { data: data as Achievement[] }
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data: data as Achievement }
  },
  
  create: async (data: Partial<Achievement>) => {
    const { data: result, error } = await supabase
      .from('achievements')
      .insert(data)
      .select()
      .single()
    
    if (error) throw error
    return { data: result as Achievement }
  },
  
  update: async (id: string, data: Partial<Achievement>) => {
    const { data: result, error } = await supabase
      .from('achievements')
      .update(data)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return { data: result as Achievement }
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { data: null }
  },
}
