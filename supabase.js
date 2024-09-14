import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gdfvnlevvpjkpyhrnlws.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZnZubGV2dnBqa3B5aHJubHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwODMxODAsImV4cCI6MjA0MTY1OTE4MH0.jjXCUIeFGHxvM6wC9LdwGBv_y4U_mUQG0WIgUZZfxko"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)