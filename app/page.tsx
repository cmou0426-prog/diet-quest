import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardView from "./dashboard-view";
import EmptyQuestState from "./empty-quest-state";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch the most recent quest for this user
  const { data: quest, error: questError } = await supabase
    .from("quests")
    .select("quest_name, target_calories")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (questError || !quest) {
    return <EmptyQuestState />;
  }

  // Temporarily fetching all logs to inspect the data and avoid the 'created_at' column error
  const { data: logs, error: logsError } = await supabase
    .from("daily_logs")
    .select("*")
    .eq("user_id", user.id);

  if (logsError) {
    console.error("Error fetching logs:", {
      message: logsError.message,
      code: logsError.code,
      details: logsError.details,
      hint: logsError.hint
    });
  }

  // Map the logs to ensure they work with the UI even if the column names are different
  const mappedLogs = (logs || []).map(log => ({
    id: log.id,
    meal_name: log.meal_name,
    calories: log.calories,
    // Use logged_at if created_at is missing, or fallback to a default
    created_at: log.created_at || log.logged_at || new Date().toISOString()
  })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <DashboardView 
      questName={quest.quest_name} 
      targetCalories={quest.target_calories} 
      dailyLogs={mappedLogs}
    />
  );
}
