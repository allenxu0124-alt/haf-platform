import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dxiwvaevchevsnoxdswo.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4aXd2YWV2Y2hldnNub3hkc3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyOTY5NTUsImV4cCI6MjA4Njg3Mjk1NX0.Fe3CvumjAtO4ldDH8sC9D32AUsaizxvboz9lj4-XMA8"

export const supabase = createClient(supabaseUrl, supabaseKey)
