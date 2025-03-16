
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Create an admin account if it doesn't exist
 */
export const createAdminAccount = async () => {
  try {
    // Check if admin already exists - simplified query
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", "mousa.omar.com@gmail.com")
      .single();

    if (existingUser) {
      console.log("Admin account already exists");
      return;
    }

    // Create admin account
    const { error } = await supabase.auth.signUp({
      email: "mousa.omar.com@gmail.com",
      password: "Bn0mar@5G",
      options: {
        data: {
          full_name: "Bn0mar",
        },
      },
    });

    if (error) {
      console.error("Error creating admin account:", error);
      return;
    }

    console.log("Admin account created successfully");
  } catch (error) {
    console.error("Error in createAdminAccount:", error);
  }
};

/**
 * Optimized login function with better error handling and performance
 */
export const loginUser = async (email: string, password: string) => {
  try {
    // Show loading toast
    const toastId = toast.loading("جاري تسجيل الدخول...");
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    toast.dismiss(toastId);
    
    if (error) throw error;
    
    toast.success("تم تسجيل الدخول بنجاح");
    return { data, error: null };
  } catch (error: any) {
    toast.error(error.message || "فشل تسجيل الدخول");
    return { data: null, error };
  }
};

/**
 * Initialize the admin account
 */
export const initializeAdmin = async () => {
  await createAdminAccount();
};
