import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  FALLBACK_MACHINES,
  FALLBACK_PROJECTS,
  FALLBACK_SERVICES,
  type Machine,
  type Project,
  type Service,
} from "@/data/content";

export function useMachines() {
  return useQuery<Machine[]>({
    queryKey: ["machines"],
    initialData: FALLBACK_MACHINES,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("machines")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_MACHINES;
      return data as unknown as Machine[];
    },
  });
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    initialData: FALLBACK_SERVICES,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_SERVICES;
      return data as unknown as Service[];
    },
  });
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    initialData: FALLBACK_PROJECTS,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_PROJECTS;
      return data as unknown as Project[];
    },
  });
}
