import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Server, Globe, Lock, ArrowRight, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { isV2Registry } from "@/api/registry";

const formSchema = z.object({
  registryUrl: z.string().url("Invalid URL").min(1, "Registry URL required"),
});

type LoginForm = z.infer<typeof formSchema>;

export default function Login() {
  const [error, setError] = useState("");
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registryUrl: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    try {
      const ok = await isV2Registry(data.registryUrl);
      if (!ok) throw new Error("This registry is not compatible with Docker Registry v2.");
      localStorage.setItem("registryUrl", data.registryUrl);
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "Unable to contact registry");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-lg space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl shadow-lg mb-4">
                <Package size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Registry View</h1>
              <p className="text-slate-600 dark:text-slate-400">Connect to your registry to explore repositories</p>
            </div>

            <Card className="shadow-xl border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Registry Connection
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Enter your Docker Registry URL to access and manage your container images
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="registryUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Registry URL
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://registry.example.com or http://localhost:5000" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {error && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
                      </div>
                    )}

                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full h-11">
                      {form.formState.isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Connecting...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Connect to Registry
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="pt-4 border-t">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      Supported Registries
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {["Registry v2 compatible", "Self-hosted registries", "Local development registries"].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Need help setting up a registry?
                <a
                  href="https://hub.docker.com/_/registry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-1 underline hover:no-underline transition-all"
                >
                  View documentation
                </a>
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
