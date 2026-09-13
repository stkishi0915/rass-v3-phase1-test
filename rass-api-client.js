/*
 * RASS v3 Phase 1 client
 *
 * This file assumes @supabase/supabase-js is loaded in the page.
 * The Dify API key is NEVER stored in this file.
 */

export async function sendRassMessage({
  supabase,
  query,
  conversationId = "",
  inputs = {},
}) {
  if (!supabase) throw new Error("supabase client is required");
  if (!query || typeof query !== "string") throw new Error("query is required");

  const { data, error } = await supabase.functions.invoke("rass-chat", {
    body: {
      query,
      conversation_id: conversationId,
      inputs,
    },
  });

  if (error) {
    throw new Error(error.message || "RASS API request failed");
  }

  if (!data?.ok) {
    throw new Error(data?.error || "RASS API request failed");
  }

  return {
    answer: data.answer || "",
    conversationId: data.conversation_id || "",
    messageId: data.message_id || "",
  };
}
