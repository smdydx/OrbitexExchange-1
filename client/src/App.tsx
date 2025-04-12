import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layouts/main-layout";
import Home from "@/pages/home";
import Buy from "@/pages/buy";
import Stake from "@/pages/stake";
import Rewards from "@/pages/rewards";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <ProtectedRoute path="/buy" component={Buy}/>
      <ProtectedRoute path="/stake" component={Stake}/>
      <ProtectedRoute path="/rewards" component={Rewards}/>
      <ProtectedRoute path="/dashboard" component={Dashboard}/>
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainLayout>
          <Router />
        </MainLayout>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
