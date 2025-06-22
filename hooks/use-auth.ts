"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      authService.setToken(data.token);
      authService.setUser(data.user);
      queryClient.setQueryData(["user"], data.user);
      toast.success("Welcome back!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      authService.setToken(data.token);
      authService.setUser(data.user);
      queryClient.setQueryData(["user"], data.user);
      toast.success("Account created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const profileQuery = useQuery({
    queryKey: ["user"],
    queryFn: authService.getProfile,
    enabled: !!authService.getToken(),
    retry: false,
  });

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      authService.setUser(data);
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });

  const logout = () => {
    authService.logout();
    queryClient.clear();
    window.location.href = "/";
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    updateProfile: updateProfileMutation.mutate,
    user: profileQuery.data,
    isLoading:
      profileQuery.isLoading ||
      loginMutation.isPending ||
      registerMutation.isPending,
    isAuthenticated: !!authService.getToken() && !!profileQuery.data,
  };
};
